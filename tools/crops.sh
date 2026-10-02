#!/usr/bin/env sh
# The shop tiles are square crops from the client's own concept boards
# (public/brand/board-1.webp and board-3.webp, the files he sent), upscaled
# to 800 with a light unsharp so the 2x stretch does not read as blur. Kevin,
# 2026-10-01: use his photos so the store looks legit. Replace each with
# real product photography when the goods exist; each file is its slug plus
# a cut number.
#
#   sh tools/crops.sh        (needs ImageMagick's convert)
set -e
cd "$(dirname "$0")/.."
cut() { convert "$1" -crop "$2" +repage -filter Lanczos -resize 800x800 -unsharp 0x0.8+0.6+0.02 -quality 86 "public/shop/$3.jpg"; }
# Re-cut 2026-10-02 to keep every tile to one product. The products overlap
# on the boards, so the first cut carried half a wristband in the tee tile,
# the board's black border across the top of the hoodie, and scraps of the
# gray tee's lettering beside the bottle. Each crop now starts inside its
# own panel and stops short of the neighbour's lettering; the cost is a
# tighter frame and a larger upscale (the bottle is 165px to 800).
#
# The file names carry a -2 because the image optimizer (here and on
# Vercel) caches by URL: written over the old names, the old crops kept
# being served. A future re-cut bumps the number and the paths in
# src/data/shop.ts with it.
cut public/brand/board-3.webp 230x230+434+548 the-tee-2
cut public/brand/board-1.webp 232x232+598+612 the-hoodie-2
cut public/brand/board-1.webp 330x330+5+640   the-hat-2
cut public/brand/board-1.webp 200x200+452+822 the-wristband-2
cut public/brand/board-3.webp 165x165+712+662 the-bottle-2
ls -la public/shop
