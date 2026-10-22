"""Export image layers from the figcraft design as optimized WebP files.

usage: python tools/export_assets.py            (exports every entry in MANIFEST, skipping existing files)
       python tools/export_assets.py --force    (re-exports everything)

Each entry: output path -> (node id, max width in px, quality).
The node's image fill is exported with its crop applied, so the file matches what the design shows.
"""
import io, json, sys, zipfile
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parents[1]
FORCE = '--force' in sys.argv

MANIFEST = {
    # Último Ensayo
    'assets/ultimo/hero.webp': ('3561', 1920, 90),
    'assets/ultimo/logo.webp': ('3563', 760, 86),
    'assets/ultimo/parchment.webp': ('3560', 1920, 78),
    'assets/ultimo/city.webp': ('3557', 1920, 92),
    'assets/ultimo/luisa-violin.webp': ('3594', 900, 82),
    'assets/ultimo/wood.webp': ('3558', 1600, 74),
    'assets/ultimo/book.webp': ('3595', 1800, 82),
    # Bomberman
    'assets/bomber/cover.webp': ('3627', 1920, 80),
    'assets/bomber/explosion.webp': ('3650', 1920, 82),
    'assets/bomber/title.webp': ('3647', 1200, 86),
    'assets/bomber/backdrop.webp': ('3625', 1920, 76),
    'assets/bomber/luisa-confetti.webp': ('3698', 1000, 82),
    'assets/bomber/rock.webp': ('3668', 288, 84),
    'assets/bomber/ground.webp': ('3731', 288, 84),
    'assets/bomber/ground-shadow.webp': ('3717', 288, 84),
    'assets/bomber/block.webp': ('3759', 288, 84),
    'assets/bomber/door.webp': ('3781', 290, 86),
    'assets/bomber/power-1.webp': ('3773', 170, 88),
    'assets/bomber/power-2.webp': ('3774', 170, 88),
    'assets/bomber/power-3.webp': ('3775', 170, 88),
    'assets/bomber/power-4.webp': ('3776', 170, 88),
    'assets/bomber/power-5.webp': ('3777', 170, 88),
    'assets/bomber/power-6.webp': ('3778', 170, 88),
    'assets/bomber/power-7.webp': ('3779', 170, 88),
    # Shared portfolio landing
    'assets/common/landing-top.webp': ('3548', 1920, 78),
    'assets/common/landing-side.webp': ('3552', 1600, 70),
    'assets/common/luisa-sentada.webp': ('3581', 1000, 84),
    # AR Dev
    'assets/ar/claro-galaxy.webp': ('367', 1600, 76),
    'assets/ar/claro-phone-1.webp': ('3242', 720, 84),
    'assets/ar/claro-phone-2.webp': ('3243', 560, 84),
    'assets/ar/claro-phone-3.webp': ('3244', 800, 84),
    'assets/ar/separator.webp': ('3289', 1920, 78),
    'assets/ar/dinomochis-logo.webp': ('3292', 726, 86),
    'assets/ar/dinomochis-logo-shadow.webp': ('3291', 650, 80),
    'assets/ar/dinomochis-phone-1.webp': ('3325', 320, 84),
    'assets/ar/dinomochis-phone-2.webp': ('3326', 470, 84),
    'assets/ar/dinomochis-phone-3.webp': ('3327', 470, 84),
    'assets/ar/dinomochis-phone-4.webp': ('3328', 540, 84),
    'assets/ar/dinomochis-phone-5.webp': ('3329', 520, 84),
    # Web Dev
    'assets/web/windmar-bg.webp': ('230', 1920, 76),
    'assets/web/windmar-collage.webp': ('288', 1120, 82),
    'assets/web/windmar-phone.webp': ('301', 620, 84),
    'assets/web/laptop.webp': ('302', 1112, 86),
    'assets/web/flame-bg.webp': ('232', 1920, 74),
    'assets/web/flame-logo.webp': ('332', 364, 88),
}


def main():
    archive = zipfile.ZipFile(ROOT / 'Luisa Portafolio.figcraft')
    nodes = json.loads(archive.read('document.json'))['nodes']
    for out, (node_id, max_w, quality) in MANIFEST.items():
        target = ROOT / out
        if target.exists() and not FORCE:
            continue
        node = nodes[node_id]
        paint = next(p for p in node['fills'] if p['type'] == 'image')
        image = Image.open(io.BytesIO(archive.read('images/' + paint['image'])))
        image = image.convert('RGBA') if image.mode in ('RGBA', 'LA', 'P') else image.convert('RGB')
        if paint.get('scale_mode') == 'crop' and paint.get('crop'):
            a, _, _, d, tx, ty = paint['crop']
            w, h = image.size
            image = image.crop((round(tx * w), round(ty * h), round((tx + a) * w), round((ty + d) * h)))
        if image.width > max_w:
            image = image.resize((max_w, round(image.height * max_w / image.width)), Image.LANCZOS)
        if image.mode == 'RGBA' and image.getextrema()[3][0] == 255:
            image = image.convert('RGB')
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, 'WEBP', quality=quality, method=6)
        print(f'{out}: {image.size[0]}x{image.size[1]} {target.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
