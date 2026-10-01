#!/usr/bin/env python3
"""
Trace the centerline of each hash stroke from its own pixels, for the mask
paths in HeroMark.tsx. For a vertical stroke, every row's center is the
middle of the longest run of ink in that row; for a bar, every column's.
The centers are smoothed with a moving average, thinned to a point every
~20px, and printed as an SVG path (M then L's; the mask's round-capped
140px stroke makes a polyline that fine indistinguishable from a curve).
Rows or columns with too little ink (spatter, the gaps where a bar crosses
a vertical, which belongs to the vertical) are skipped and the polyline
spans them.

  python3 tools/centerlines.py        (after tools/strokes.py; needs convert)
"""
import os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 567, 766
def alpha(path):
    subprocess.run(["convert", path, "-resize", f"{W}x{H}!", "-alpha", "extract", "-depth", "8", "gray:/tmp/rtp-cl.gray"], check=True)
    return open("/tmp/rtp-cl.gray", "rb").read()
def longest_run(line):
    best = (0, 0, 0); start = None
    for i, v in enumerate(line + [0]):
        if v > 96 and start is None: start = i
        if v <= 96 and start is not None:
            if i - start > best[0]: best = (i - start, start, i)
            start = None
    return best
def smooth(pts, k=9):
    out = []
    for i in range(len(pts)):
        win = pts[max(0, i - k):i + k + 1]
        out.append((sum(p[0] for p in win) / len(win), sum(p[1] for p in win) / len(win)))
    return out
import math
def seg_dist(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]; l2 = dx * dx + dy * dy or 1
    t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2))
    return math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
def trace(layer, axis, min_run, half, guide):
    """A row (or column) counts when its longest run of ink is at least
    min_run wide AND its center is within 40px of the last accepted one,
    so the thin tails and drips at a stroke's ends are followed and
    spatter off to the side is not. Rows are walked from the thick middle
    outward in both directions so the chain starts on the stroke body."""
    a = alpha(layer)
    lines = range(H) if axis == "y" else range(W)
    runs = {}
    for i in lines:
        line = [a[i * W + x] for x in range(W)] if axis == "y" else [a[y * W + i] for y in range(H)]
        n, s, e = longest_run(line)
        if n >= min_run: runs[i] = ((s + e) / 2, n)
    mid = max(runs, key=lambda i: runs[i][1])
    acc = {mid: runs[mid][0]}
    for step in (1, -1):
        chain = [(mid, runs[mid][0])]; i = mid + step; miss = 0
        while 0 <= i < (H if axis == "y" else W) and miss < 160:
            # Predict where the stroke's center should be from the slope of
            # the last twenty accepted lines, so the chain crosses the gaps
            # where a bar's pixels belong to a vertical (up to ~140 wide)
            # and reaches the drips at a vertical's end, while spatter off
            # to the side still fails the 40px test.
            recent = chain[-80:]
            if len(recent) >= 8:
                # Least squares over the last eighty lines: the ragged edge
                # at a crossing throws a two-point slope wildly off.
                n = len(recent); mi = sum(q[0] for q in recent) / n; mc = sum(q[1] for q in recent) / n
                var = sum((q[0] - mi) ** 2 for q in recent) or 1
                slope = sum((q[0] - mi) * (q[1] - mc) for q in recent) / var
                predicted = mc + slope * (i - mi)
            else:
                predicted = chain[-1][1]
            # A line also counts if it sits near the straight guide read
            # off the grid (tools/strokes.py's centerline): the chain fit
            # alone overshoots across a wide crossing gap when the stroke
            # bends at its start, as the lower bar does.
            (gx1, gy1), (gx2, gy2) = guide
            if axis == "y":
                t = (i - gy1) / (gy2 - gy1); g = gx1 + t * (gx2 - gx1)
            else:
                t = (i - gx1) / (gx2 - gx1); g = gy1 + t * (gy2 - gy1)
            if i in runs and (abs(runs[i][0] - predicted) <= 40 or abs(runs[i][0] - g) <= 45):
                acc[i] = runs[i][0]; chain.append((i, runs[i][0])); miss = 0
            else:
                miss += 1
            i += step
    pts = [((acc[i], i) if axis == "y" else (i, acc[i])) for i in sorted(acc)]
    pts = smooth(pts)
    thin = pts[::20] + [pts[-1]]
    # Coverage: every ink pixel must lie within half the mask width of the
    # polyline, or the write-on would never reveal it.
    ink = [(x, y) for y in range(H) for x in range(W) if a[y * W + x] > 32]
    miss = [q for q in ink if min(seg_dist(q, thin[k], thin[k + 1]) for k in range(len(thin) - 1)) > half]
    d = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in thin)
    return d, len(ink), len(miss)
B = os.path.join(ROOT, "public/brand")
GUIDES = [((268, 95), (118, 735)), ((432, 12), (262, 700)), ((25, 325), (485, 248)), ((15, 478), (560, 385))]
for n, axis, min_run, half in [(1, "y", 14, 75), (2, "y", 14, 70), (3, "x", 14, 70), (4, "x", 14, 75)]:
    d, ink, miss = trace(f"{B}/hash-s{n}.webp", axis, min_run, half, GUIDES[n - 1])
    print(f"s{n} (mask width {half*2}): {ink} ink pixels, {miss} outside the mask")
    print(f"  d: {d}")
