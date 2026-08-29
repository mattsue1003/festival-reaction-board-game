from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
IMAGE = ROOT / "public" / "assets" / "card-back.png"
OUTPUT = ROOT / "output" / "pdf" / "節慶連連拍_牌背_48張.pdf"


def draw_cover_image(c, image, x, y, w, h):
    iw, ih = image.getSize()
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(image, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def draw_back(c, image, x, y, w, h):
    c.saveState()
    path = c.beginPath()
    path.roundRect(x, y, w, h, 10)
    c.clipPath(path, stroke=0, fill=0)
    c.setFillColor(colors.HexColor("#18353F"))
    c.rect(x, y, w, h, fill=1, stroke=0)
    draw_cover_image(c, image, x, y, w, h)
    c.restoreState()

    c.setStrokeColor(colors.HexColor("#FFF4D8"))
    c.setLineWidth(1.4)
    c.roundRect(x + 4, y + 4, w - 8, h - 8, 7, fill=0, stroke=1)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("節慶連連拍｜牌背 48 張")
    c.setAuthor("節慶連連拍")

    page_w, page_h = A4
    card_w, card_h = 180, 252
    gap_x, gap_y = 14, 14
    left = (page_w - (card_w * 2 + gap_x)) / 2
    top = page_h - 30
    image = ImageReader(str(IMAGE))

    for index in range(48):
        position = index % 6
        if position == 0:
            if index:
                c.showPage()
            c.setFillColor(colors.HexColor("#FFF9F0"))
            c.rect(0, 0, page_w, page_h, fill=1, stroke=0)
        col = position % 2
        row = position // 2
        x = left + col * (card_w + gap_x)
        y = top - (row + 1) * card_h - row * gap_y
        draw_back(c, image, x, y, card_w, card_h)

    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
