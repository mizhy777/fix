"""Recorta el fondo blanco de fotos de producto con componentes conexas.

El fondo es el componente blanco que ocupa casi todo el lienzo. Los interiores
blancos del producto (por ejemplo la caja de los AirPods) son componentes
compactos y se conservan.
"""
from pathlib import Path
import shutil
import numpy as np
import cv2
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "public" / "products"
BACKUP = Path(__file__).resolve().parent / "backup_products"
BACKUP.mkdir(exist_ok=True)

TARGETS = [
    "iphone-17-pro.webp",
    "iphone-17-pro-max.webp",
    "ipad-a16.webp",
    "airpods-5.webp",
    "adaptador-20w.webp",
    "cable-usb-c.webp",
    "cable-lightning.webp",
]

for name in TARGETS:
    path = PRODUCTS / name
    backup = BACKUP / name
    shutil.copy2(path, backup)
    im = Image.open(backup).convert("RGBA")
    rgb = np.array(im.convert("RGB"))
    h, w = rgb.shape[:2]

    white = np.all(rgb >= 238, axis=2).astype("uint8") * 255
    num, labels, stats, _ = cv2.connectedComponentsWithStats(white, connectivity=4)

    remove = np.zeros((h, w), dtype=bool)
    removed_components = 0
    for idx in range(1, num):
        x, y, cw, ch, area = stats[idx]
        touches_border = x == 0 or y == 0 or x + cw >= w or y + ch >= h
        spans_canvas = cw >= w * 0.82 and ch >= h * 0.82
        if (touches_border or spans_canvas) and area > w * h * 0.002:
            remove |= labels == idx
            removed_components += 1

    out = np.array(im)
    out[:, :, 3][remove] = 0
    result = Image.fromarray(out, "RGBA")

    bbox = result.getchannel("A").getbbox()
    if bbox:
        result = result.crop(bbox)

    side = max(result.size)
    pad = int(side * 0.07)
    canvas = Image.new("RGBA", (result.width + pad * 2, result.height + pad * 2), (255, 255, 255, 0))
    canvas.alpha_composite(result, (pad, pad))
    if max(canvas.size) > 1400:
        canvas.thumbnail((1400, 1400), Image.LANCZOS)
    canvas.save(path, "WEBP", quality=90, method=6)
    transparent = float((np.array(canvas)[:, :, 3] == 0).mean() * 100)
    print(
        f"{path.stem:28s} {canvas.width}x{canvas.height} "
        f"transparente {transparent:5.1f}%  componentes {removed_components}"
    )
