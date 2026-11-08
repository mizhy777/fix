"""Normaliza los renders descargados: recorta, centra y exporta WebP optimizado."""
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "public" / "products" / "raw"
OUT = ROOT / "public" / "products"
OUT.mkdir(parents=True, exist_ok=True)

# raw -> nombre público
MAP = {
    "iphone-18-pro-max-burgundy": "iphone-18-pro-max-burgundy",
    "iphone-18-pro-max-silver": "iphone-18-pro-max-silver",
    "iphone-18-pro-max-black": "iphone-18-pro-max-black",
    "iphone-18-pro-max-glacier": "iphone-18-pro-max-glacier",
    "iphone-17-mist-blue": "iphone-17",
    "iphone-16-ultramarine": "iphone-16",
    "gsm17pro": "iphone-17-pro",
    "gsm17promax": "iphone-17-pro-max",
    "galaxy-s26-ultra-violet": "galaxy-s26-ultra-512",
    "galaxy-s26-ultra-blue": "galaxy-s26-ultra-256",
    "ipad-a16-blue": "ipad-a16",
    "watch-series-12": "watch-series-12",
    "watch-se-3": "watch-se-3",
    "airpods-5": "airpods-5",
    "airpods-pro-3": "airpods-pro-3",
    "adaptador-20w": "adaptador-20w",
    "cable-usb-c": "cable-usb-c",
    "cable-lightning": "cable-lightning",
}


def find_raw(stem: str) -> Path:
    for ext in ("png", "jpg", "jpeg", "webp"):
        p = RAW / f"{stem}.{ext}"
        if p.exists():
            return p
    raise FileNotFoundError(stem)


def trim(im: Image.Image) -> Image.Image:
    if im.mode in ("RGBA", "LA"):
        alpha = im.getchannel("A")
        bbox = alpha.getbbox()
        if bbox:
            im = im.crop(bbox)
    else:
        rgb = im.convert("RGB")
        # detecta el recuadro del producto sobre fondo claro
        bg = Image.new("RGB", rgb.size, (255, 255, 255))
        diff = ImageChops.difference(rgb, bg).convert("L")
        diff = diff.point(lambda p: 255 if p > 10 else 0)
        bbox = diff.getbbox()
        if bbox:
            im = im.crop(bbox)
    return im


def pad(im: Image.Image, ratio: float = 0.06) -> Image.Image:
    side = max(im.width, im.height)
    pad = int(side * ratio)
    canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (255, 255, 255, 0))
    canvas.alpha_composite(im.convert("RGBA"), (pad, pad))
    return canvas


for raw_stem, public_stem in MAP.items():
    src = find_raw(raw_stem)
    im = Image.open(src)
    im.load()
    im = trim(im)
    im = pad(im)
    # limita el lado mayor a 1400 px conservando proporción
    if max(im.size) > 1400:
        im.thumbnail((1400, 1400), Image.LANCZOS)
    target = OUT / f"{public_stem}.webp"
    im.save(target, "WEBP", quality=90, method=6, lossless=False)
    print(f"{public_stem:28s} {im.width:4d}x{im.height:<4d} {target.stat().st_size//1024:4d} KB")

# logo de marca
logo = Image.open(ROOT.parent / "Logotipo blanco moderno FIX MOBIL.png").convert("RGBA")
logo.thumbnail((1000, 1000), Image.LANCZOS)
brand = ROOT / "public" / "brand"
brand.mkdir(parents=True, exist_ok=True)
logo.save(brand / "fix-mobil-blanco.png", optimize=True)
print("logo", logo.size, (brand / "fix-mobil-blanco.png").stat().st_size // 1024, "KB")

# icono cuadrado: marca FIX sobre azul marino
mark = logo.crop((0, 0, logo.width, int(logo.height * 0.66)))
mark.thumbnail((760, 500), Image.LANCZOS)
icon = Image.new("RGBA", (512, 512), (10, 20, 42, 255))
mark.thumbnail((420, 300), Image.LANCZOS)
icon.alpha_composite(mark, ((512 - mark.width) // 2, (512 - mark.height) // 2))
icon.convert("RGB").save(brand / "fix-mobil-icon.png", optimize=True)
print("icon ok")
