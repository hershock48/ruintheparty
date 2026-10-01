#!/usr/bin/env python3
"""
Split the hash into its four strokes, one layer each, for the write-on in
HeroMark.tsx. Every painted pixel of public/brand/hash.png goes to the
stroke whose centerline it is nearest; a pixel inside a vertical's own
width goes to that vertical, so the crossings belong to the strokes that
were painted first. The four layers recombine to the original exactly
(the script checks). Centerlines were read off a grid over the art.

  python3 tools/strokes.py        (needs ImageMagick's convert)
"""
import math, os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, "public/brand")
W, H = 567, 766
SEGS = [((268, 95), (118, 735)), ((432, 12), (262, 700)), ((25, 325), (485, 248)), ((15, 478), (560, 385))]
HALF = [52, 48, 0, 0]
run = lambda *a: subprocess.run(a, check=True)
run("convert", f"{B}/hash.png", "-alpha", "extract", "-depth", "8", "gray:/tmp/rtp-hash-alpha.gray")
a = open("/tmp/rtp-hash-alpha.gray", "rb").read(); assert len(a) == W * H
def dist(p, s):
    (x1, y1), (x2, y2) = s; dx, dy = x2 - x1, y2 - y1
    t = max(0, min(1, ((p[0] - x1) * dx + (p[1] - y1) * dy) / (dx * dx + dy * dy)))
    return math.hypot(p[0] - (x1 + t * dx), p[1] - (y1 + t * dy))
layers = [bytearray(W * H) for _ in SEGS]
for j in range(H):
    for i in range(W):
        v = a[j * W + i]
        if not v: continue
        d = [dist((i, j), s) for s in SEGS]
        k = next((n for n in (0, 1) if d[n] <= HALF[n]), None)
        if k is None: k = min(range(4), key=lambda n: d[n])
        layers[k][j * W + i] = v
for n, l in enumerate(layers, 1):
    open(f"/tmp/rtp-s{n}.gray", "wb").write(bytes(l))
    run("convert", "-size", f"{W}x{H}", "-depth", "8", f"gray:/tmp/rtp-s{n}.gray", f"/tmp/rtp-s{n}.png")
    run("convert", "-size", f"{W}x{H}", "xc:#00DFDF", f"/tmp/rtp-s{n}.png", "-alpha", "off", "-compose", "CopyOpacity", "-composite", "-resize", "640x", "-quality", "85", "-define", "webp:alpha-quality=90", f"{B}/hash-s{n}.webp")
out = subprocess.run(["bash", "-c", f"compare -metric AE <(convert /tmp/rtp-s1.png /tmp/rtp-s2.png /tmp/rtp-s3.png /tmp/rtp-s4.png -evaluate-sequence Max png:-) <(convert {B}/hash.png -alpha extract png:-) null:"], capture_output=True, text=True)
print("pixels that differ from the original after recombining:", out.stderr.strip(), "(want 0)")
