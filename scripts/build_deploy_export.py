from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path
from urllib.request import Request, urlopen

PROJECT = Path('/home/ubuntu/biotech-showcase')
EXPORT = Path('/home/ubuntu/tide-deployable-export')
PREVIEW = 'https://3000-i98rd0beme3qt5g08clkc-005341c5.us5.manus.computer'

if EXPORT.exists():
    shutil.rmtree(EXPORT)
EXPORT.mkdir(parents=True)

exclude = {'node_modules', 'dist', '.git', '.manus-logs', 'scripts'}

def ignore(_directory: str, names: list[str]) -> set[str]:
    return {name for name in names if name in exclude}

for item in PROJECT.iterdir():
    if item.name in exclude:
        continue
    target = EXPORT / item.name
    if item.is_dir():
        shutil.copytree(item, target, ignore=ignore)
    else:
        shutil.copy2(item, target)

source_files = list((EXPORT / 'client').rglob('*.tsx')) + list((EXPORT / 'client').rglob('*.ts')) + list((EXPORT / 'client').rglob('*.css')) + [EXPORT / 'client/index.html']
text = '\n'.join(path.read_text(encoding='utf-8') for path in source_files if path.exists())
refs = sorted(set(re.findall(r'/manus-storage/[^\"\'` )}]+', text)))
external = sorted(set(re.findall(r'https://images\.unsplash\.com/[^\"\'` )}]+', text)))
asset_dir = EXPORT / 'client' / 'public' / 'assets'
asset_dir.mkdir(parents=True, exist_ok=True)


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    request = Request(url, headers={'User-Agent': 'Tide deployable export'})
    with urlopen(request, timeout=45) as response, destination.open('wb') as handle:
        shutil.copyfileobj(response, handle)

for ref in refs:
    filename = Path(ref).name
    destination = asset_dir / filename
    download(PREVIEW + ref, destination)
    replacement = '/assets/' + filename
    for path in source_files:
        if path.exists():
            value = path.read_text(encoding='utf-8')
            updated = value.replace(ref, replacement)
            if updated != value:
                path.write_text(updated, encoding='utf-8')

for url in external:
    filename = 'tide-lab-unsplash.jpg'
    destination = asset_dir / filename
    download(url, destination)
    for path in source_files:
        if path.exists():
            value = path.read_text(encoding='utf-8')
            updated = value.replace(url, '/assets/' + filename)
            if updated != value:
                path.write_text(updated, encoding='utf-8')

readme = '''# Tide Peptides — Deployable Source Export

This package contains the Tide Peptides website source as exported from the validated Manus project, together with the referenced COA files, product documents, logo, molecular hero image, factory imagery, customer feedback images, and delivery records under `client/public/assets/`.

## Local verification

Use Node.js 20+ and pnpm. Run `pnpm install`, then `pnpm build`. The deployable static output is generated in `dist/public/`.

## Static hosting

Upload the contents of `dist/public/` to a static host. Because the site uses client-side routing, configure SPA fallback so unknown paths serve `index.html`. Keep `assets/` at the same relative path. No database or server-side API is required for the current showcase; WhatsApp buttons link directly to the Tide contact number.

## Important deployment note

This export rewrites the website's Manus storage references to local `/assets/` paths so the images remain bundled with the site. The visual content, page structure, English copy, product catalog, COA directory, customer feedback archive, and responsive layouts are preserved from the validated project version.
'''
(EXPORT / 'DEPLOY.md').write_text(readme, encoding='utf-8')
print(f'Exported source to {EXPORT}')
print(f'Downloaded {len(refs) + len(external)} assets')
