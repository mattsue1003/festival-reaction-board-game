from io import BytesIO
from pathlib import Path
import random

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
OUTPUT = ROOT / "output" / "pdf" / "節慶連連拍_48張牌卡.pdf"


FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")
if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("GameCJK", str(FONT_PATH)))
    FONT = "GameCJK"
else:
    FONT = "Helvetica"


_IMAGE_CACHE = {}


FESTIVALS = [
    {
        "name": "春節",
        "english": "LUNAR NEW YEAR",
        "image": "lunar-new-year.png",
        "pairs": [("紅包", "feature-red-envelope.png"), ("春聯", "feature-spring-couplet.png")],
    },
    {
        "name": "元宵節",
        "english": "LANTERN FESTIVAL",
        "image": "lantern-festival.png",
        "pairs": [("燈籠", "feature-lantern.png"), ("湯圓", "feature-tangyuan.png")],
    },
    {
        "name": "清明節",
        "english": "TOMB-SWEEPING DAY",
        "image": "tomb-sweeping.png",
        "pairs": [("潤餅", "feature-popiah.png"), ("掃墓", "feature-memorial.png")],
    },
    {
        "name": "端午節",
        "english": "DRAGON BOAT FESTIVAL",
        "image": "dragon-boat.png",
        "pairs": [("粽子", "feature-zongzi.png"), ("龍舟", "feature-dragon-boat.png")],
    },
    {
        "name": "七夕",
        "english": "QIXI FESTIVAL",
        "image": "qixi.png",
        "pairs": [("鵲橋", "feature-magpie-bridge.png"), ("喜鵲", "feature-magpie.png")],
    },
    {
        "name": "中元節",
        "english": "GHOST FESTIVAL",
        "image": "ghost-festival.png",
        "pairs": [("供品", "feature-offerings.png"), ("平安燈", "feature-peace-lantern.png")],
    },
    {
        "name": "中秋節",
        "english": "MID-AUTUMN FESTIVAL",
        "image": "mid-autumn.png",
        "pairs": [("月餅", "feature-mooncake.png"), ("柚子", "feature-pomelo.png")],
    },
    {
        "name": "重陽節",
        "english": "DOUBLE NINTH FESTIVAL",
        "image": "double-ninth.png",
        "pairs": [("菊花", "feature-chrysanthemum.png"), ("登高", "feature-hiking.png")],
    },
    {
        "name": "冬至",
        "english": "WINTER SOLSTICE",
        "image": "winter-solstice.png",
        "pairs": [("冬至湯圓", "feature-winter-tangyuan.png"), ("火鍋", "feature-hot-pot.png")],
    },
    {
        "name": "兒童節",
        "english": "CHILDREN'S DAY",
        "image": "childrens-day.png",
        "pairs": [("氣球", "feature-balloons.png"), ("玩具火車", "feature-toy-train.png")],
    },
    {
        "name": "母親節",
        "english": "MOTHER'S DAY",
        "image": "mothers-day.png",
        "pairs": [("康乃馨", "feature-carnation.png"), ("愛心卡片", "feature-heart-card.png")],
    },
    {
        "name": "除夕",
        "english": "NEW YEAR'S EVE",
        "image": "new-years-eve.png",
        "pairs": [("年菜", "feature-new-year-dishes.png"), ("圍爐", "feature-reunion-pot.png")],
    },
]


def image_reader(image_path: Path):
    key = str(image_path)
    if key not in _IMAGE_CACHE:
        source = Image.open(image_path).convert("RGB")
        source.thumbnail((900, 900), Image.Resampling.LANCZOS)
        buffer = BytesIO()
        source.save(buffer, format="JPEG", quality=88, optimize=True, progressive=True)
        buffer.seek(0)
        _IMAGE_CACHE[key] = (buffer, ImageReader(buffer))
    return _IMAGE_CACHE[key][1]


def fit_image(c, image_path: Path, x: float, y: float, w: float, h: float):
    image = image_reader(image_path)
    iw, ih = image.getSize()
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(image, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def rounded_text(c, text, x, y, size, color, align="left", font=FONT):
    c.setFont(font, size)
    c.setFillColor(color)
    if align == "center":
        c.drawCentredString(x, y, text)
    elif align == "right":
        c.drawRightString(x, y, text)
    else:
        c.drawString(x, y, text)


def draw_card(c, festival, pair_index, feature, feature_image, card_type, x, y, w, h):
    ink = colors.HexColor("#18353F")
    paper = colors.HexColor("#FFFDF7")
    line = colors.HexColor("#D7CBBE")
    muted = colors.HexColor("#6B5A50")
    c.setFillColor(paper)
    c.setStrokeColor(ink)
    c.setLineWidth(1.5)
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)

    c.saveState()
    c.setFillColor(ink)
    c.roundRect(x, y + h - 34, w, 34, 10, fill=1, stroke=0)
    c.rect(x, y + h - 34, w, 16, fill=1, stroke=0)
    c.restoreState()

    rounded_text(c, "節慶連連拍", x + 12, y + h - 22, 8.5, colors.white)
    rounded_text(c, "看線索", x + w - 12, y + h - 22, 8.5, colors.white, align="right")

    art_x, art_y = x + 11, y + 58
    art_w, art_h = w - 22, h - 101
    c.saveState()
    path = c.beginPath()
    path.roundRect(art_x, art_y, art_w, art_h, 7)
    c.clipPath(path, stroke=0, fill=0)
    image_filename = festival["image"] if card_type == "festival" else feature_image
    fit_image(c, ASSETS / image_filename, art_x, art_y, art_w, art_h)
    c.restoreState()

    c.setFillColor(colors.Color(1, 1, 1, alpha=0.92))
    c.setStrokeColor(line)
    c.roundRect(x + 11, y + 11, w - 22, 40, 7, fill=1, stroke=0)
    label = "節日卡" if card_type == "festival" else "特色卡"
    title = festival["name"] if card_type == "festival" else feature
    subtitle = "觀察節慶線索" if card_type == "festival" else "想想它的節日"
    rounded_text(c, label, x + 20, y + 38, 7.5, ink)
    rounded_text(c, title, x + 20, y + 20, 15, colors.HexColor("#30251F"))
    rounded_text(c, subtitle, x + w - 20, y + 24, 8, muted, align="right")


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    page_w, page_h = A4
    card_w, card_h = 180, 252
    gap_x, gap_y = 14, 14
    left = (page_w - (card_w * 2 + gap_x)) / 2
    top = page_h - 30

    deck = []
    for festival in FESTIVALS:
        for pair_index, (feature, feature_image) in enumerate(festival["pairs"], start=1):
            deck.append((festival, pair_index, feature, feature_image, "festival"))
            deck.append((festival, pair_index, feature, feature_image, "feature"))

    random.Random(20260829).shuffle(deck)

    for index, card in enumerate(deck):
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
        draw_card(c, *card, x, y, card_w, card_h)

    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
