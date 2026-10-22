"""Export original image bytes and responsibility copy from the saved design."""
import json
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
with zipfile.ZipFile(r'D:\BeatrizAligh\Luisa chamba def.figcraft') as archive:
    document = json.loads(archive.read('document.json'))
    nodes = document['nodes']
    destination = root / 'Img' / 'Portafolio' / 'Ilumimochis'
    for node_id, filename in [('1332', 'figcraft-mobile-landscape.png')]:
        paint = next(p for p in nodes[node_id]['fills'] if p['type'] == 'image')
        (destination / filename).write_bytes(archive.read('images/' + paint['image']))
    source = {}
    for node_id in ['292','293','294','395','396','397','437','438','439','479','480','481','1503','1504']:
        source[node_id] = nodes[node_id]['characters']
    (root / 'data' / 'mochis-figcraft-source.json').write_text(json.dumps(source, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Exported original mobile landscape and verified responsibility text.')
