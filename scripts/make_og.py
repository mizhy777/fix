"""Genera la imagen Open Graph de FIX MOBIL."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
W, H = 1200, 630

# fondo degradado
bg = Image.new("RGB", (W, H), "#071021")
top = (7, 16, 33)
bottom = (10, 38, 78)
for y in range(H):
    t = y / H
    color = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    ImageDraw.Draw(bg).line([(0, y), (W, y)], fill=color)

# resplandor azul
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((680, -120, 1280, 480), fill=(38, 96, 235, 120))
gd.ellipse((-220, 330, 380, 900), fill=(225, 29, 46, 40))
glow = glow.filter(ImageFilter.GaussianBlur(100))
bg = Image.alpha_composite(bg.convert("RGBA"), glow)

draw = ImageDraw.Draw(bg)

# rejilla
for x in range(0, W, 54):
    draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 9))
for y in range(0, H, 54):
    draw.line([(0, y), (W, y)], fill=(255, 255, 255, 9))

font_bold = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 46)
font_head = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 68)
font_head2 = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 54)
font_small = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 23)
font_tiny = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 19)
font_badge = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 20)

# logo
logo = Image.open(ROOT / "public" / "brand" / "fix-mobil-blanco.png").convert("RGBA")
logo.thumbnail((300, 220), Image.LANCZOS)
bg.alpha_composite(logo, (72, 54))

# badge
draw.rounded_rectangle((74, 270, 400, 316), radius=23, fill=(225, 29, 46, 235))
draw.text((96, 281), "PRECIOS IMPERDIBLES", font=font_badge, fill="white")

draw.text((72, 340), "Tecnología original.", font=font_head, fill="white")
draw.text((72, 414), "Sin pagar de más.", font=font_head2, fill=(141, 184, 255))

draw.text((74, 500), "iPhone 18 Pro Max · Galaxy S26 Ultra", font=font_small, fill=(190, 205, 226))
draw.text((74, 534), "Apple Watch · iPad · AirPods · Accesorios", font=font_small, fill=(190, 205, 226))
draw.text((74, 582), "C.C. River Plaza · Local 229 · Cúcuta", font=font_tiny, fill=(130, 150, 178))

# producto
phone = Image.open(ROOT / "public" / "products" / "iphone-18-pro-max-burgundy.webp").convert("RGBA")
phone.thumbnail((430, 540), Image.LANCZOS)
# sombra
shadow = Image.new("RGBA", bg.size, (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
sd.ellipse((740, 500, 1140, 590), fill=(0, 0, 0, 130))
shadow = shadow.filter(ImageFilter.GaussianBlur(30))
bg = Image.alpha_composite(bg, shadow)
draw = ImageDraw.Draw(bg)
bg.alpha_composite(phone, (760 + (430 - phone.width) // 2, 560 - phone.height))

# borde
draw.rounded_rectangle((8, 8, W - 8, H - 8), radius=24, outline=(255, 255, 255, 25), width=2)

out = ROOT / "public" / "brand" / "og-fixmobil.jpg"
bg.convert("RGB").save(out, quality=90, optimize=True)
print(out, bg.size, out.stat().st_size // 1024, "KB")
