"""Generate optimized WebP variants of the source photos into public/images.

Each scene has a landscape (desktop) and a portrait (mobile) crop. Run with
`npm run images` after adding or swapping photos in materials/photos.
"""
from pathlib import Path
from PIL import Image

SRC = Path("materials/photos")
OUT = Path("public/images")

SCENES = {
    "coast":     ("56c89f22-18a9-4b72-994c-de674372e2a1.jpg", "91eef0b9-14eb-431f-a5a5-f1e1752af342.jpg"),
    "touch":     ("15df0690-1e7f-4bae-9254-f315a2581e2f.jpg", "1123a591-3a0d-482b-9bb4-07f079e68f6f.jpg"),
    "pines":     ("2a144669-eeee-46bf-8163-576f6eb07ad3.jpg", "a33795b9-8d02-40f8-a299-89ab3792b34f.jpg"),
    "boardwalk": ("fb68aaf9-b6db-45a3-8d43-955bf41de40c (1).jpg", "37a8a533-977c-40ab-aed6-760daac205f6.jpg"),
    "mist":      ("8ea83e3d-a162-43b9-b225-5bb1ec6169f7.jpg", "c7f344f6-4b74-496d-89df-64e9d4285e1f.jpg"),
    "dunes":     ("af389385-10c7-4a7a-8429-1b78b9f5f842.jpg", "d6f997f2-345f-45b4-9b10-c12bd1ffcc5f.jpg"),
    "dusk":      ("06b122e965d2491d9cd7521946e80493.jpg", "6c53ab1e-22e9-4c8f-ae9a-3b76d1a4ae19.jpg"),
    "grove":     ("def834f6-f37b-4b28-aa81-badf0b90f56b.jpg", None),
}


def save(im: Image.Image, width: int, name: str) -> None:
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(OUT / name, "WEBP", quality=78, method=6)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for scene, (land, port) in SCENES.items():
        im = Image.open(SRC / land).convert("RGB")
        save(im, 1920, f"{scene}-l-1920.webp")
        save(im, 1200, f"{scene}-l-1200.webp")
        if port:
            p = Image.open(SRC / port).convert("RGB")
            save(p, 1080, f"{scene}-p-1080.webp")
            save(p, 720, f"{scene}-p-720.webp")

    # Social share card (1200x630) from the hero scene.
    og = Image.open(SRC / SCENES["coast"][0]).convert("RGB")
    ratio = 1200 / 630
    h = round(og.width / ratio)
    top = (og.height - h) // 2
    og.crop((0, top, og.width, top + h)).resize((1200, 630), Image.LANCZOS).save(
        Path("public") / "og-image.jpg", "JPEG", quality=82, optimize=True
    )


if __name__ == "__main__":
    main()
