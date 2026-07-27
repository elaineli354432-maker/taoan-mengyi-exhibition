from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_IMAGES = ROOT / "public" / "images"
BACKUP = ROOT / "public" / "_original_five_acts_before_pan_style"

SHEETS = [
    (
        Path(r"C:\Users\HUAWEI\.codex\generated_images\019f9d4c-19fa-7d03-99a3-f5be5a7f0198\call_ZAfuyhBv0AhcdRjITA52F62u.png"),
        "act-youth.png",
        ["birth-shanyin.png", "scene-child-wide.png", "nanzhen.png", "lanxue.png", "qinpai.png"],
    ),
    (
        Path(r"C:\Users\HUAWEI\.codex\generated_images\019f9d4c-19fa-7d03-99a3-f5be5a7f0198\call_UZ8nldfIM36qtVWOYx6WBEnv.png"),
        "act-prosperity.png",
        ["fengmen.png", "scene-youth-wide.png", "huxinting.png", "zhongqiu.png", "buxiyuan.png", "baiyang.png"],
    ),
    (
        Path(r"C:\Users\HUAWEI\.codex\generated_images\019f9d4c-19fa-7d03-99a3-f5be5a7f0198\call_VINgw7FBqQSHXCTnldkZuSxv.png"),
        "act-obsession.png",
        ["snow-obsession.png", "opera-obsession.png", "tea-obsession.png", "qin-obsession.png", "garden-obsession.png"],
    ),
    (
        Path(r"C:\Users\HUAWEI\.codex\generated_images\019f9d4c-19fa-7d03-99a3-f5be5a7f0198\call_3fpvwnIEhoyUYye0roeY2Jqq.png"),
        "act-decline.png",
        ["lanterns.png", "zhaoqing.png", "famine.png", "roadblock.png"],
    ),
    (
        Path(r"C:\Users\HUAWEI\.codex\generated_images\019f9d4c-19fa-7d03-99a3-f5be5a7f0198\call_AQVPvo1EObhZiOF3mnx6JKDG.png"),
        "act-dream.png",
        ["mingwang.png", "books.png", "scene-elder-wide.png", "old-zhangdai.png"],
    ),
]


def backup(path: Path) -> None:
    if not path.exists():
        return
    target = BACKUP / path.relative_to(ROOT)
    if target.exists():
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, target)


def save_crop(sheet: Image.Image, index: int, count: int, target: Path) -> None:
    width, height = sheet.size
    left = round(width * index / count)
    right = round(width * (index + 1) / count)
    crop = sheet.crop((left, 0, right, height))
    target.parent.mkdir(parents=True, exist_ok=True)
    crop.save(target, optimize=True)


def main() -> None:
    for source, sheet_name, targets in SHEETS:
        if not source.exists():
            raise FileNotFoundError(source)

        sheet_target = PUBLIC_IMAGES / sheet_name
        backup(sheet_target)
        shutil.copy2(source, sheet_target)

        with Image.open(source) as image:
            sheet = image.convert("RGB")
            for index, target_name in enumerate(targets):
                target = PUBLIC_IMAGES / target_name
                backup(target)
                save_crop(sheet, index, len(targets), target)
                print(f"updated {target.relative_to(ROOT)}")
        print(f"updated {sheet_target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
