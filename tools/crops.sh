#!/usr/bin/env sh
# The shop tiles are square crops from the client's own concept boards
# (public/brand/board-1.webp and board-3.webp, the files he sent), upscaled
# to 800 with a light unsharp so the 2x stretch does not read as blur. Kevin,
# 2026-10-01: use his photos so the store looks legit. Replace each with
# real product photography when the goods exist; the slugs are the filenames.
#
#   sh tools/crops.sh        (needs ImageMagick's convert)
set -e
cd "$(dirname "$0")/.."
cut() { convert "$1" -crop "$2" +repage -filter Lanczos -resize 800x800 -unsharp 0x0.8+0.6+0.02 -quality 86 "public/shop/$3.jpg"; }
# These are the FIRST cut, restored. A second cut on 2026-10-02 tightened
# every tile to one product (tee 230x230+434+548, hoodie 232x232+598+612,
# hat 330x330+5+640, wristband 200x200+452+822, bottle 165x165+712+662);
# Kevin preferred the first, which keeps the neighbouring goods in frame
# and reads as a styled flat lay rather than a catalogue cutout. The file
# names are the originals again; if a future cut changes the pixels under
# the same name, rename (the image optimizer caches by URL).
cut public/brand/board-3.webp 300x300+385+535 the-tee
cut public/brand/board-1.webp 320x320+580+599 the-hoodie
cut public/brand/board-1.webp 340x340+0+630   the-hat
cut public/brand/board-1.webp 220x220+435+789 the-wristband
cut public/brand/board-3.webp 250x250+655+615 the-bottle
ls -la public/shop
