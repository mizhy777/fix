"""Descarga los renders oficiales de producto usados en el catálogo FIX MOBIL."""
from pathlib import Path
from io import BytesIO
import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products" / "raw"
OUT.mkdir(parents=True, exist_ok=True)

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36"
    ),
    "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    "Referer": "https://www.apple.com/",
}

APPLE = "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/"
NEWS = "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/"

SOURCES = {
    # iPhone 18 Pro Max (renders transparentes)
    "iphone-18-pro-max-burgundy": APPLE + "iphone-18-pro-max-finish-select-burgundy-202609?wid=940&hei=1112&fmt=png-alpha&.v=UmkydCsrWUVqOXF2VEM2dzB6cklhWUQ2cmRnWCtSNmVDd2t4cWxWSnIvNUx6WCtoaUlSYjRxQWg5OHYwMGU3Y0V3S0grNWRDVTNuaVhuc2dPbTQ4Q0V1RGVGY05iMGVCVXhlTE1BQUZjMDAxTm1nZUsxSHRZRDZzS3RtMVpRd0Q",
    "iphone-18-pro-max-silver": APPLE + "iphone-18-pro-max-finish-select-silver-202609?wid=940&hei=1112&fmt=png-alpha&.v=UmkydCsrWUVqOXF2VEM2dzB6cklhWUQ2cmRnWCtSNmVDd2t4cWxWSnIvNWtvNWRUSnBraGdtbVpoaEhCcStEZ1JIMnJUYkhxeFlQUFF6U1JnK1dZZmROL1VCcUxMZGhIeWpHS1Y3Y0ZmQnB1TDcrSFk1dTh4UW5LRWFTUk84MUg",
    "iphone-18-pro-max-black": APPLE + "iphone-18-pro-max-finish-select-black-202609?wid=940&hei=1112&fmt=png-alpha&.v=UmkydCsrWUVqOXF2VEM2dzB6cklhWUQ2cmRnWCtSNmVDd2t4cWxWSnIvNmxIMGwrWFVjeE1VUlRMRWVWaXVleHNjcXQ1U2FBY2RzWU80SEN4Z1NYZXA4TndFSGFWdWZMa21CRXlrUm45elpxZTk0czYvTGlFaFJ6MUo4NytKelc",
    "iphone-18-pro-max-glacier": APPLE + "iphone-18-pro-max-finish-select-glacier-202609?wid=940&hei=1112&fmt=png-alpha&.v=UmkydCsrWUVqOXF2VEM2dzB6cklhWUQ2cmRnWCtSNmVDd2t4cWxWSnIvNlIrVGhreVd3bkM2T2VVUFVFWDlxYWV5ZElERWRzQWhyQ0Rwckl6Y1pkWnBzc0VHaDlyWnc3WFg1a2VpT21xTVVSTFY0UkdPZmR4RjZFWCtGdUNoa2E",
    # iPhone 17
    "iphone-17-mist-blue": APPLE + "iphone-17-finish-select-mistblue-202509_GEO_US?wid=940&hei=1112&fmt=png-alpha&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxaFUrdlByZTJvbHVPZlZpd2VmTDUrYUI4cld1RkdIdHMyNWllZ2FiU0E0cmV5ZElERWRzQWhyQ0Rwckl6Y1pkWnBzc0VHaDlyWnc3WFg1a2VpT21xTVhDVFJORzRhUXllTlNFT2dXSlJuOXk",
    # iPhone 16
    "iphone-16-ultramarine": APPLE + "iphone-16-ultramarine-select-202409?wid=940&hei=1112&fmt=png-alpha&.v=aWI5aGdudlZCalMrV3A2QU5NeUlaUS9CQ2hhaHB3cVp0QldQUmg0R3F6NURreFIvckpMM0RHVW1acklsZHpObDJpdkFkeXRGenVzczlmSUZMYlgrMHBJQzFqek53VEVRN3NLQnhtYWpXTnYrNUdoc3VSMTlEQkd4dTVQR01rblc",
    # iPhone 17 Pro (fotografía oficial Apple Newsroom)
    "iphone-17-pro-orange": NEWS + "Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg",
    "iphone-17-pro-max-lineup": NEWS + "Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg",
    # Samsung Galaxy S26 Ultra
    "galaxy-s26-ultra-blue": "https://images.samsung.com/is/image/samsung/p6pim/us/s2602/gallery/us-galaxy-s26-ultra-s948-sm-s948ulbaatt-550992840?$PD_GALLERY_PNG$",
    "galaxy-s26-ultra-violet": "https://images.samsung.com/is/image/samsung/p6pim/us/s2602/gallery/us-galaxy-s26-ultra-s948-sm-s948uzvexaa-550994083?$PD_GALLERY_PNG$",
    # iPad (A16) 11"
    "ipad-a16-blue": APPLE + "ipad-finish-select-202503-blue-wifi?wid=1600&hei=900&fmt=jpeg&qlt=92&.v=1739318920731",
    # Apple Watch
    "watch-series-12": APPLE + "watch-compare-series-12-202609?wid=1040&hei=1040&fmt=png-alpha&.v=eEpjZGlsbzI4YmtuR2pKQXNDTzZ5M0ZLRG9pNmhWMEtWWTF2Vk1nWEZPbERrbkNTUjRjeWMzS083WGlUYmh1ZjAzOVFHb3N0MkVmS01ZcFh0d1Y4R25yZ1VoS3RaaGR1amtBSWJUdGZlM2M",
    "watch-se-3": APPLE + "watch-compare-se-3-202609?wid=1040&hei=1040&fmt=png-alpha&.v=eEpjZGlsbzI4YmtuR2pKQXNDTzZ5ekhaamlqcFJZSks4dDNjRlpIWmZyMkNwenZmdENrN1NaTUE5TldXRk5lalB3a3pOZFM1cm5iZlQxd0NvYVFSTTE4UVZLWHpaNTZzV1BXaXNXYnlOUG8",
    # AirPods
    "airpods-5": APPLE + "airpods-5-hero-select-202609?wid=1200&hei=1126&fmt=jpeg&qlt=92&.v=RVU2SGpGc09oYXdoRmpNcmQ5OG9tR3VtVXdjeDQ5eHAyck91MG5EMElJTGkyVU55U21PWTMyajVGNTlWWnhwak14MXJScFRZN3Y5OWZsRXVrN1k4cFltcWM3RC92MW1IaTRiYkh6SThoUGc",
    "airpods-pro-3": APPLE + "airpods-pro-compare-202509?wid=1040&hei=1200&fmt=png-alpha&.v=ZnlNck16RHdFMkxPbVgyckcxQ295SWM5dW4ramo4RThZRWNFZVlDZWt2eWVJSDByU2tYV1Z4NFlUcXB5aTNyak1ySFlEMWZsaHZ3bk91K3Q3TFkySTQ2WjliOWFwaXZhT05WYkFaRnhkbFE",
    # Accesorios
    "adaptador-20w": APPLE + "MWVV3_AV3_GEO_US?wid=1100&hei=1100&fmt=jpeg&qlt=92&.v=1751998599108",
    "cable-usb-c": APPLE + "MYQH3?wid=1100&hei=1100&fmt=jpeg&qlt=92",
    "cable-lightning": APPLE + "MM0A3?wid=1100&hei=1100&fmt=jpeg&qlt=92&.v=eUlveHRzODJteSsxTjdnT0c2MlJyNHExblZJSGFXSFVPMUE2c2RxMy8rTEF1VEd5eGN1emdKWlloT0lEakNwVUhzM3FoRzRIRHhvZ0tLejd1ZWF1SkE",
}

for name, url in SOURCES.items():
    ext = "png" if "png" in url.lower() else "jpg"
    target = OUT / f"{name}.{ext}"
    if target.exists() and target.stat().st_size > 2000:
        print(f"skip {name}")
        continue
    ok = False
    for attempt in range(3):
        try:
            r = requests.get(url, headers=HEADERS, timeout=45)
            r.raise_for_status()
            img = Image.open(BytesIO(r.content))
            img.load()
            target.write_bytes(r.content)
            print(f"ok   {name:28s} {img.width}x{img.height} {len(r.content)//1024} KB")
            ok = True
            break
        except Exception as exc:
            last = exc
    if not ok:
        print(f"FAIL {name:28s} {last}")
