"""Print every text layer of a figcraft frame (absolute y order) — used to copy design text exactly."""
import json, sys, zipfile
z = zipfile.ZipFile('Luisa Portafolio.figcraft')
nodes = json.loads(z.read('document.json'))['nodes']
def walk(nid, ox=0, oy=0, out=None):
    n = nodes[str(nid)]
    if n.get('visible') is False: return
    t = n.get('transform', [1, 0, 0, 1, 0, 0])
    x, y = ox + t[4], oy + t[5]
    if n['type'] == 'text':
        out.append((round(y), round(x), nid, n['style']['font_family'] + ' ' + n['style']['font_style'] + ' ' + str(n['style']['font_size']), n['characters']))
    for c in n.get('children', []) or []: walk(c, x, y, out)
for root in sys.argv[1:]:
    out = []; walk(root, -nodes[root]['transform'][4], -nodes[root]['transform'][5], out)
    print('=====', root, nodes[root]['name'])
    for y, x, nid, f, s in sorted(out): print(f'[{nid} y{y} x{x} {f}] {s}')
