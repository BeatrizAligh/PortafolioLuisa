"""Builds the Bomberman sprite sheets (WebP) from art/Sprite bomberman.
Every source sheet is an even grid of frames laid out horizontally."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'art' / 'Sprite bomberman'
OUT = ROOT / 'assets' / 'bomber'

def frames(name, count, cell_w):
    sheet = Image.open(SRC / name).convert('RGBA')
    w = sheet.width / count
    out = []
    for i in range(count):
        f = sheet.crop((round(i * w), 0, round((i + 1) * w), sheet.height))
        out.append(f.resize((cell_w, round(sheet.height * cell_w / w)), Image.LANCZOS))
    return out

def save_rows(rows, path):
    cw, ch = rows[0][0].size
    sheet = Image.new('RGBA', (cw * max(len(r) for r in rows), ch * len(rows)))
    for y, row in enumerate(rows):
        for x, f in enumerate(row):
            sheet.alpha_composite(f, (x * cw, y * ch))
    sheet.save(OUT / path, 'WEBP', quality=88, method=6)
    print(path, sheet.size, (OUT / path).stat().st_size // 1024, 'KB', 'cell', (cw, ch))

# Girl: rows = down (front), up (back), right, left
save_rows([frames('frenteAsset 90000.png', 4, 180), frames('arribaAsset 80000.png', 4, 180),
           frames('lateral ultimaAsset 120000.png', 4, 180), frames('lateral ultimaAsset 120001.png', 4, 180)], 'girl.webp')
save_rows([frames('Bomb.png', 4, 220)], 'bomb.webp')
for name, src, count in [('head-gio.webp', 'GioAsset 620000.png', 8), ('head-luis.webp', 'LuisAsset 630000.png', 10), ('head-vane.webp', 'VaneAsset 610000.png', 9)]:
    save_rows([frames(src, count, 150)], name)
