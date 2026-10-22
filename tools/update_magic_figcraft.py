"""Refresh the newly added Magic Birthday states without re-exporting unrelated assets."""
import io
import ast
import json
import zipfile
from pathlib import Path
from PIL import Image

root=Path(__file__).resolve().parents[1]
archive=zipfile.ZipFile(r'D:\BeatrizAligh\Luisa chamba.figcraft')
doc=json.loads(archive.read('document.json'))
nodes=doc['nodes']
out=root/'Img'/'Portafolio'/'MagicBirthday'

def export_image(node_id,name,crop=True):
    node=nodes[str(node_id)]
    paint=next(p for p in node['fills'] if p['type']=='image')
    im=Image.open(io.BytesIO(archive.read('images/'+paint['image']))).convert('RGBA')
    if crop and paint.get('crop'):
        a,b,c,d,x,y=paint['crop'];w,h=im.size
        im=im.crop((round(x*w),round(y*h),round((x+a)*w),round((y+d)*h)))
    im.thumbnail((2400,2400),Image.Resampling.LANCZOS)
    im.save(out/name,'WEBP',quality=92,method=4)
    return {'node':node_id,'size':im.size,'asset':name}

assets=[export_image(1896,'ingredients-creepy-background.webp'),export_image(1587,'birthday-mobile-scene.webp'),export_image(1777,'clouds-full.webp',False)]

# Export the newly added connection icon from its original vector network.
tree=ast.parse((root/'tools'/'export_magic_figcraft.py').read_text(encoding='utf-8'))
definitions=[node for node in tree.body if isinstance(node,ast.FunctionDef) and node.name in ('color','paths','svg_node')]
exec(compile(ast.Module(body=definitions,type_ignores=[]),'vector-export','exec'),globals())
node=nodes['1944']
(out/'icon-network.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">{svg_node(1944,False)}</svg>',encoding='utf-8')

def icon_node(node_id,transform=True):
    node=nodes[str(node_id)]
    matrix=node.get('transform',[1,0,0,1,0,0]) if transform else [1,0,0,1,0,0]
    content=''
    if node['type']=='vector':
        for fill in node.get('fills',[]):
            if fill['type']=='solid':
                content+=''.join(f'<path d="{p}" fill="{color(fill)}" fill-rule="evenodd"/>' for p in paths(node))
        for stroke in node.get('strokes',[]):
            if stroke['type']!='solid':continue
            network=node['network'];vertices=network['vertices']
            for segment in network['segments']:
                p,q=vertices[segment['a']],vertices[segment['b']];ta,tb=segment['ta'],segment['tb']
                command=f'M {p["x"]} {p["y"]} C {p["x"]+ta[0]} {p["y"]+ta[1]} {q["x"]+tb[0]} {q["y"]+tb[1]} {q["x"]} {q["y"]}'
                content+=f'<path d="{command}" fill="none" stroke="{color(stroke)}" stroke-width="{node.get("stroke",{}).get("weight",1)}" stroke-linecap="round" stroke-linejoin="round"/>'
    content+=''.join(icon_node(child) for child in node.get('children',[]))
    return f'<g transform="matrix({" ".join(map(str,matrix))})">{content}</g>'

for node_id,name in {1831:'programming',1852:'integration',1871:'experience',1912:'events',1996:'phone',2058:'notes',2101:'device'}.items():
    node=nodes[str(node_id)];w,h=node['width'],node['height']
    (out/('icon-'+name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="-4 -4 {w+8} {h+8}">{icon_node(node_id,False)}</svg>',encoding='utf-8')

# Keep the original copy IDs stable for the application; node IDs shifted in the new save.
path=root/'data'/'magic-content.js'
old=json.loads(path.read_text(encoding='utf-8').split('=',1)[1].split(';',1)[0].strip())
for old_id in list(old):
    current=nodes.get(str(int(old_id)+26))
    if int(old_id)<=1813 and current and current.get('type')=='text':
        old[old_id]=current['characters']
extra={
    'deviceBody':nodes['1978']['characters'],
    'connectionSteps':[nodes[str(i)]['characters'] for i in [1949,1957,1965,1973,1953,1961,1969,1977]],
    'mechanicDescriptions':[nodes[str(i)]['characters'] for i in [1911,2009,2068,2108]],
    'mobileFrames':{str(i):{'name':nodes[str(i)]['name'],'width':nodes[str(i)]['width'],'height':nodes[str(i)]['height']} for i in [2118,2138,2165,2180,2198]},
    'assets':assets,
}
path.write_text('window.MAGIC_FIGCRAFT = '+json.dumps(old,ensure_ascii=False)+';\nwindow.MAGIC_EXTRA = '+json.dumps(extra,ensure_ascii=False)+';\n',encoding='utf-8')
(root/'data'/'magic-extra-source.json').write_text(json.dumps(extra,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(assets))
