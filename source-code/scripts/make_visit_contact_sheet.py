from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

src = Path('/home/ubuntu/webdev-static-assets/tide-factory-visit')
files = sorted(path for path in src.glob('*') if path.is_file())
thumb_w, thumb_h = 360, 260
label_h = 42
cols = 2
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + label_h)), 'white')
for i, path in enumerate(files):
    im = Image.open(path).convert('RGB')
    im.thumbnail((thumb_w - 20, thumb_h - 20))
    tile = Image.new('RGB', (thumb_w, thumb_h), '#eef4fb')
    x = (thumb_w - im.width) // 2
    y = (thumb_h - im.height) // 2
    tile.paste(im, (x, y))
    draw = ImageDraw.Draw(tile)
    draw.rectangle((0, 0, thumb_w - 1, thumb_h - 1), outline='#b7cce2', width=2)
    ox = (i % cols) * thumb_w
    oy = (i // cols) * (thumb_h + label_h)
    sheet.paste(tile, (ox, oy))
    d = ImageDraw.Draw(sheet)
    d.text((ox + 12, oy + thumb_h + 10), path.name, fill='#0b2c52')

out = Path('/home/ubuntu/biotech-showcase/visit-contact-sheet.jpg')
sheet.save(out, quality=92)
print(out)
