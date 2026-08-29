from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "social" / "facebook-square-background.png"
OUTPUT = ROOT / "public" / "social" / "節慶反應桌遊_Facebook_1x1.png"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")


def font(size):
    return ImageFont.truetype(str(FONT_PATH), size)


def build():
    image = Image.open(SOURCE).convert("RGB").resize((1080, 1080), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(image)

    navy = "#18353F"
    orange = "#D85D3A"
    muted = "#6F675F"

    draw.rounded_rectangle((78, 86, 180, 98), radius=6, fill=orange)
    draw.text((78, 128), "節慶反應桌遊", font=font(76), fill=navy)
    draw.text((82, 236), "看節日・找線索・快手拍卡", font=font(30), fill=orange)

    draw.text((82, 323), "12 個節日 × 24 組關聯", font=font(27), fill=navy)
    draw.multiline_text(
        (82, 392),
        "從節日記憶出發，\n找出正確關聯，拍下你的得分。",
        font=font(29),
        fill=muted,
        spacing=12,
    )

    draw.line((82, 580, 380, 580), fill=orange, width=4)
    draw.text((82, 620), "設計者 愛迪樂｜鍾孟修", font=font(25), fill=navy)
    draw.text((82, 665), "職能治療師", font=font(23), fill=muted)

    image.save(OUTPUT, format="PNG", optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    build()
