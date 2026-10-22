"""Export Magic Birthday's original atlas crops and vectors from Figcraft."""
import html
import io
import json
from pathlib import Path
import zipfile
from PIL import Image

root = Path(__file__).resolve().parents[1]
out = root / 'Img' / 'Portafolio' / 'MagicBirthday'
out.mkdir(parents=True, exist_ok=True)
archive = zipfile.ZipFile(r'D:\BeatrizAligh\Luisa chamba def.figcraft')
document = json.loads(archive.read('document.json'))
nodes = document['nodes']

images = {
    1722:'birthday-scene',1751:'paper-divider',1753:'balloon-star',1754:'balloon-square',
    1755:'balloon-triangle',1756:'balloon-circle',1788:'luisa-magic',1789:'ingredients-background',
    1797:'ingredient-1',1799:'ingredient-2',1798:'ingredient-3',1800:'ingredient-4',1801:'birthday-logo',
    1783:'creepy-1',1784:'creepy-2',1785:'creepy-3',1786:'creepy-4',
    1770:'theatre-wall',1772:'curtain-left',1773:'curtain-right',
    1774:'valance-1',1775:'valance-2',1776:'valance-3',1777:'valance-4',1778:'valance-5',1779:'valance-6',
    1768:'theatre-floor',1873:'dark-ingredient-1',1874:'dark-ingredient-2',1876:'dark-ingredient-3',1875:'dark-ingredient-4'
}
manifest = {}
for node_id, filename in images.items():
    node = nodes[str(node_id)]
    paint = next(p for p in node['fills'] if p['type'] == 'image')
    im = Image.open(io.BytesIO(archive.read('images/' + paint['image']))).convert('RGBA')
    crop = paint.get('crop')
    if crop:
        a,b,c,d,x,y = crop
        if abs(b) > .001 or abs(c) > .001:
            raise ValueError('Unexpected rotated crop')
        w,h = im.size
        im = im.crop((round(x*w),round(y*h),round((x+a)*w),round((y+d)*h)))
    im.thumbnail((2400,2400), Image.Resampling.LANCZOS)
    im.save(out / (filename+'.webp'), 'WEBP', quality=92, method=6)
    manifest[str(node_id)] = {'name':node['name'],'asset':filename+'.webp','size':im.size,'frameSize':[node['width'],node['height']]}

def color(fill):
    c = fill['color']
    return 'rgb(%s)' % ','.join(str(round(c[k]*255)) for k in ('r','g','b'))

def paths(node):
    network = node['network']
    vertices, segments = network['vertices'], network['segments']
    result = []
    for region in network.get('regions', []):
        commands = []
        for loop in region['loops']:
            if not loop: continue
            first = segments[loop[0]]
            current = first['a']
            p = vertices[current]
            commands.append(f'M {p["x"]} {p["y"]}')
            for index in loop:
                s = segments[index]
                forward = s['a'] == current
                start,end = (s['a'],s['b']) if forward else (s['b'],s['a'])
                ta,tb = (s['ta'],s['tb']) if forward else (s['tb'],s['ta'])
                p,q = vertices[start],vertices[end]
                commands.append(f'C {p["x"]+ta[0]} {p["y"]+ta[1]} {q["x"]+tb[0]} {q["y"]+tb[1]} {q["x"]} {q["y"]}')
                current = end
            commands.append('Z')
        result.append(' '.join(commands))
    return result

def svg_node(node_id, transform=True):
    node = nodes[str(node_id)]
    if node.get('visible') is False: return ''
    matrix = node.get('transform',[1,0,0,1,0,0]) if transform else [1,0,0,1,0,0]
    attrs = f'transform="matrix({" ".join(map(str,matrix))})" opacity="{node.get("opacity",1)}"'
    content = ''
    for fill in node.get('fills',[]):
        if fill.get('type') != 'solid' or not fill.get('visible',True): continue
        style = f'fill="{color(fill)}" fill-opacity="{fill.get("opacity",1)*fill["color"].get("a",1)}"'
        if node['type'] == 'vector':
            content += ''.join(f'<path d="{p}" {style}/>' for p in paths(node))
        elif node['type'] == 'rectangle':
            content += f'<rect width="{node["width"]}" height="{node["height"]}" {style}/>'
    content += ''.join(svg_node(c) for c in node.get('children',[]))
    return f'<g {attrs}>{content}</g>'

for node_id, filename in {1805:'icon-programming',1807:'icon-experience',1806:'icon-integration',1963:'icon-events',1961:'icon-phone',1964:'icon-notes',1967:'icon-device'}.items():
    node=nodes[str(node_id)]
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{node["width"]}" height="{node["height"]}" viewBox="0 0 {node["width"]} {node["height"]}">{svg_node(node_id,False)}</svg>'
    (out/(filename+'.svg')).write_text(svg,encoding='utf-8')
    manifest[str(node_id)]={'name':node['name'],'asset':filename+'.svg'}

texts = {key:node['characters'] for key,node in nodes.items() if node.get('type')=='text' and 1709<=int(key)<=2051}
(root/'data'/'magic-figcraft-source.json').write_text(json.dumps({'images':manifest,'texts':texts},ensure_ascii=False,indent=2),encoding='utf-8')
(root/'data'/'magic-content.js').write_text('window.MAGIC_FIGCRAFT = '+json.dumps(texts,ensure_ascii=False)+';\n',encoding='utf-8')
print(f'Exported {len(images)} WebP assets and 7 SVG icons.')
