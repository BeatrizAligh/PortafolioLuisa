"""Creates WebP versions of the heavy PNG/SVG images used by the site and points the code at them.
The original files are kept untouched (they remain the editable sources).
usage: python tools/optimize_images.py
"""
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parents[1]
CODE = ['index.html', 'portfolio.html', 'ar.html', 'web.html', *[str(p.relative_to(ROOT)) for p in (ROOT / 'css').glob('*.css')], *[str(p.relative_to(ROOT)) for p in (ROOT / 'js').glob('*.js')]]
# source -> max width (px) of the WebP copy
IMAGES = {
    'Img/BG/ImagenOpcacidadCapa4.png': 1746, 'Img/BG/UpImageCapa2.png': 1746, 'Img/BG/BaseCapa1.png': 1746,
    'Img/BG/MascaraCapa3.png': 1746, 'Img/BG/Cloud.png': 1746,
    'Img/Portafolio/Ilumimochis/imgImage143.png': 1672, 'Img/Portafolio/Ilumimochis/imgImage153.png': 1122,
    'Img/Portafolio/Ilumimochis/imgCarga.png': 2400, 'Img/Portafolio/Ilumimochis/imgJugar1.png': 1920,
    'Img/Portafolio/Ilumimochis/figcraft-mobile-landscape.png': 1438, 'Img/Portafolio/Ilumimochis/imgImage109.png': 570,
    'Img/Portafolio/Ilumimochis/imgIlumimochisAsset40000.png': 1800, 'Img/Portafolio/Ilumimochis/imgRectangle16.png': 309,
    'Img/Portafolio/Ilumimochis/imgRectangle74.png': 397, 'Img/Portafolio/Ilumimochis/imgRectangle78.png': 447,
    'Img/Portafolio/Ilumimochis/imgYogocosmicosAsset140000.png': 305, 'Img/Portafolio/Ilumimochis/imgUrbonubososAsset70000.png': 305,
    'Img/Figma/Portafolio/luisa-sentada-portafolio.png': 1600, 'Img/Figma/Portafolio/textura-fondo.png': 570,
    'Img/LuisaFotos/LuisaPaz.png': 955, 'Img/LuisaFotos/Pintas.png': 434, 'Img/LuisaFotos/Luida en el aire.png': 591,
    'Img/Cristales/ARDev/Active.png': 900, 'Img/Cristales/ARDev/Inactive.png': 900,
    'Img/Cristales/PoryectosDestacados/Active.png': 900, 'Img/Cristales/PoryectosDestacados/Inactive.png': 900,
    'Img/Cristales/UnityDev/Active.png': 900, 'Img/Cristales/UnityDev/Inactive.png': 900,
    'Img/Cristales/WebDev/Active.png': 900, 'Img/Cristales/WebDev/Inactive.png': 900,
}
# Plain reference swaps (already converted elsewhere)
SWAPS = {'Img/Logosvectores/GitHubLogo.svg': 'Img/Logosvectores/github.webp', 'Img/Logosvectores/BehanceLogo.svg': 'Img/Logosvectores/behance.webp'}


def main():
    swaps = dict(SWAPS)
    for src, max_w in IMAGES.items():
        path = ROOT / src
        if not path.exists():
            print('missing', src); continue
        out = path.with_suffix('.webp')
        if not out.exists():
            im = Image.open(path)
            im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
            if im.width > max_w:
                im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
            im.save(out, 'WEBP', quality=82, method=6)
            print(f'{src}: {path.stat().st_size // 1024} KB -> {out.stat().st_size // 1024} KB')
        swaps[src] = str(out.relative_to(ROOT)).replace('\\', '/')
    for name in CODE:
        file = ROOT / name
        text = file.read_text(encoding='utf-8')
        new = text
        for a, b in swaps.items():
            new = new.replace(a, b).replace(a.replace(' ', '%20'), b.replace(' ', '%20'))
        if new != text:
            file.write_text(new, encoding='utf-8'); print('updated', name)
    # crystals are built in app.js from the folder name + state; switch the extension there too
    app = ROOT / 'js' / 'app.js'
    text = app.read_text(encoding='utf-8')
    text = text.replace("const extension = item.id === 'game' ? 'webp' : 'png';", "const extension = 'webp';")
    app.write_text(text, encoding='utf-8')


if __name__ == '__main__':
    main()
