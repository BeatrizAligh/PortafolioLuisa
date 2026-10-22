"""Print a figcraft subtree with absolute positions: python tools/tree.py <id> [depth]"""
import json, sys, zipfile
z = zipfile.ZipFile('Luisa Portafolio.figcraft')
nodes = json.loads(z.read('document.json'))['nodes']
def show(nid, depth, maxd, ox, oy):
    n = nodes[str(nid)]; t = n.get('transform', [1,0,0,1,0,0]); x, y = ox+t[4], oy+t[5]
    fl = ','.join(f['type'][0] + ('*' if f.get('scale_mode')=='crop' else '') for f in n.get('fills', []) or [] if f.get('visible', True))
    ex = repr(n['characters'][:40]) if n['type']=='text' else ''
    rot = '' if abs(t[1])<1e-3 else f' rot'
    print('  '*depth + f"{nid} {n['type'][:5]} {n.get('name','')[:38]!r} ({x:.0f},{y:.0f}) {n['width']:.0f}x{n['height']:.0f} [{fl}]{rot}{' HIDDEN' if n.get('visible') is False else ''}{' MASK' if n.get('is_mask') else ''} {ex}")
    if depth < maxd:
        for c in n.get('children', []) or []: show(c, depth+1, maxd, x, y)
r = sys.argv[1]; show(r, 0, int(sys.argv[2]) if len(sys.argv)>2 else 2, -nodes[r]['transform'][4], -nodes[r]['transform'][5])
