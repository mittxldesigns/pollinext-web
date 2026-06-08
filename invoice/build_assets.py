#!/usr/bin/env python3
"""Build self-contained font CSS (base64) + UPI QR for the invoice."""
import base64, re, sys, urllib.request, pathlib

HERE = pathlib.Path(__file__).parent
ASSETS = HERE / "assets"
ASSETS.mkdir(exist_ok=True)

# ---------- 1. Embed Inter (latin + latin-ext only) as base64 ----------
css = (ASSETS / "inter.css").read_text()
# split into (subset-comment, font-face-body) pairs
pairs = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
keep = {"latin", "latin-ext"}
out_blocks = []
seen = 0
for subset, body in pairs:
    if subset not in keep:
        continue
    weight = re.search(r"font-weight:\s*([\d ]+);", body)
    style = re.search(r"font-style:\s*(\w+);", body)
    url = re.search(r"src:\s*url\((https[^)]+\.woff2)\)", body)
    urange = re.search(r"unicode-range:\s*([^;]+);", body)
    if not (weight and url and urange):
        continue
    data = urllib.request.urlopen(url.group(1), timeout=20).read()
    b64 = base64.b64encode(data).decode()
    seen += 1
    out_blocks.append(f"""@font-face{{
  font-family:'Inter';
  font-style:{style.group(1) if style else 'normal'};
  font-weight:{weight.group(1).strip()};
  font-display:block;
  src:url(data:font/woff2;base64,{b64}) format('woff2');
  unicode-range:{urange.group(1).strip()};
}}""")
(ASSETS / "fonts.css").write_text("\n".join(out_blocks))
print(f"fonts.css written: {seen} font-face blocks (latin + latin-ext), "
      f"{(ASSETS/'fonts.css').stat().st_size//1024} KB")
# sanity: confirm a latin-ext block (which carries the rupee glyph) made it in
assert any("20AD" in b or "20A0" in b for b in out_blocks), "latin-ext (rupee) subset missing!"
print("rupee-bearing latin-ext subset present: OK")

# ---------- 2. UPI payment QR ----------
import qrcode
from urllib.parse import quote
VPA   = "9458889336@ptyes"
NAME  = "Priyansh Tyagi"
AMT   = "12500.00"
NOTE  = "Website Revamp - 50% Advance"
upi = (f"upi://pay?pa={VPA}&pn={quote(NAME)}&am={AMT}"
       f"&cu=INR&tn={quote(NOTE)}")
qr = qrcode.QRCode(version=None, error_correction=qrcode.constants.ERROR_CORRECT_M,
                   box_size=12, border=2)
qr.add_data(upi)
qr.make(fit=True)
img = qr.make_image(fill_color="#0B1F3A", back_color="white")
img.save(ASSETS / "upi-qr.png")
print(f"upi-qr.png written: {(ASSETS/'upi-qr.png').stat().st_size//1024} KB, payload={upi}")
