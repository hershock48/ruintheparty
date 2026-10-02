#!/usr/bin/env python3
"""
Split the hash into its four strokes, one layer each, for the write-on in
HeroMark.tsx. Run from the repo root; needs ImageMagick's convert.

HOW A PIXEL IS ASSIGNED. The first version put every pixel within a fixed
distance of a straight centerline into that stroke, and because the real
strokes are neither straight nor a constant width, slivers of the bars
landed in the verticals' layers and showed through while the verticals
were being drawn (Kevin saw it). This version finds each stroke's ACTUAL
outline:

  1. For a vertical, in every row, the run of ink that contains the
     stroke's centerline (the traced path from tools/centerlines.py, or the
     straight guide the first time). Its left and right ends are the
     stroke's edges in that row. Rows where that run is far wider than the
     stroke's typical width are crossings, where the run has merged with a
     bar. There, and in a guard band of rows either side (where the bar's
     bristle streaks touch the vertical and widen its run), each edge is a
     straight line fitted through fifty clean rows above and fifty below,
     which is where a brush edge would be under the paint.
  2. The same for a bar, by column, with top and bottom edges.
  3. A pixel inside a vertical's outline belongs to that vertical (the
     verticals were painted first, so the crossings are theirs). Otherwise
     a pixel inside a bar's outline belongs to that bar. Whatever is left,
     the bristle streaks and the spatter, goes to the stroke whose outline
     is nearest in that pixel's own row or column.

The four layers recombine to the original exactly, and the script says how
many pixels of each bar's outline ended up in a vertical (want: only the
crossings, nothing beyond them).

  python3 tools/strokes.py
"""
import math, os, statistics, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, "public/brand")
W, H = 567, 766
INK = 32
END = 10  # lines past a traced path's end that still count as the stroke
# Centerlines: the traced paths from tools/centerlines.py once they exist,
# else the straight guides read off a grid over the art.
GUIDES = [
    "M289 106 L262 121 L257 141 L261 161 L250 181 L244 201 L239 221 L234 241 L227 261 L221 281 L217 301 L211 321 L206 341 L207 361 L193 381 L189 401 L186 421 L180 441 L176 461 L172 481 L169 501 L164 521 L161 541 L155 561 L148 581 L144 601 L140 621 L134 641 L129 661 L125 681 L128 698 L127 700",
    "M479 18 L471 34 L449 54 L438 74 L432 94 L413 114 L402 134 L405 154 L385 174 L379 194 L372 214 L365 234 L364 254 L357 274 L355 294 L349 314 L344 334 L339 354 L334 374 L328 394 L327 414 L317 434 L314 454 L307 474 L298 494 L293 514 L293 534 L269 584 L264 637 L260 658 L256 677",
    "M50 362 L66 356 L86 351 L106 337 L126 334 L146 332 L166 316 L234 315 L271 304 L291 303 L311 283 L404 280 L424 264 L444 270 L461 269 L462 268",
    "M26 513 L41 504 L61 496 L81 491 L101 486 L121 479 L173 463 L228 464 L248 448 L268 440 L337 432 L375 417 L395 411 L415 406 L435 409 L456 416 L477 406 L497 402 L514 396 L514 395",
]
AXIS = ["y", "y", "x", "x"]

def run(*a): subprocess.run(a, check=True)
def parse(d):
    import re
    return [(float(x), float(y)) for x, y in re.findall(r"(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)", d)]
def center_at(pts, axis, i):
    """The centerline's x at row i (axis y) or y at column i (axis x), by linear interpolation along the polyline, extended straight past the ends."""
    k = 1 if axis == "y" else 0
    seq = sorted(pts, key=lambda p: p[k])
    if i <= seq[0][k]: a, b = seq[0], seq[1]
    elif i >= seq[-1][k]: a, b = seq[-2], seq[-1]
    else:
        a = max((p for p in seq if p[k] <= i), key=lambda p: p[k]); b = min((p for p in seq if p[k] > i), key=lambda p: p[k])
    if b[k] == a[k]: return a[1 - k]
    t = (i - a[k]) / (b[k] - a[k])
    return a[1 - k] + t * (b[1 - k] - a[1 - k])
def seg_dist(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]; l2 = dx * dx + dy * dy or 1
    t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2))
    return math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
def path_dist(p, pts): return min(seg_dist(p, pts[k], pts[k + 1]) for k in range(len(pts) - 1))

run("convert", f"{B}/hash.png", "-alpha", "extract", "-depth", "8", "gray:/tmp/rtp-hash-alpha.gray")
a = open("/tmp/rtp-hash-alpha.gray", "rb").read(); assert len(a) == W * H
ink_at = lambda x, y: a[y * W + x] > INK

def outline(pts, axis):
    """Per row (axis y) or column (axis x): the run of ink containing the centerline, as (lo, hi), with crossings interpolated. None where the stroke is absent."""
    n_lines, n_across = (H, W) if axis == "y" else (W, H)
    raw = {}
    # Only the lines the stroke actually spans, plus a few for the ragged
    # cap past the traced end. Extending the centerline's end segment
    # across the whole canvas put the top of the first vertical, whose
    # last segment hooks sideways, into the second vertical's bristles 80
    # rows up, and handed those bristles to the wrong layer.
    k = 1 if axis == "y" else 0
    lo_line = int(min(p[k] for p in pts)) - END; hi_line = int(max(p[k] for p in pts)) + END
    for i in range(max(0, lo_line), min(n_lines, hi_line + 1)):
        c = int(round(center_at(pts, axis, i)))
        if not (0 <= c < n_across): continue
        at = (lambda j: ink_at(j, i)) if axis == "y" else (lambda j: ink_at(i, j))
        if not at(c):
            # The centerline sits in a hairline gap inside the stroke: look a few pixels either side.
            for d in range(1, 8):
                if 0 <= c - d < n_across and at(c - d): c = c - d; break
                if 0 <= c + d < n_across and at(c + d): c = c + d; break
            else:
                continue
        lo = c
        while lo - 1 >= 0 and at(lo - 1): lo -= 1
        hi = c
        while hi + 1 < n_across and at(hi + 1): hi += 1
        raw[i] = (lo, hi)
    if not raw: return {}, 0
    widths = sorted(hi - lo for lo, hi in raw.values())
    typical = statistics.median(widths[len(widths) // 4: len(widths) * 3 // 4] or widths)
    keys = sorted(raw)
    # Crossing blocks: runs of lines where the stroke's run has merged with
    # another stroke (far wider than typical), or where it is missing.
    wide = {i for i in keys if raw[i][1] - raw[i][0] > typical * 1.2}
    blocks = []
    for i in keys:
        if i in wide:
            if blocks and i - blocks[-1][1] <= 3: blocks[-1][1] = i
            else: blocks.append([i, i])
    GUARD, WINDOW = 14, 50
    # Lines inside a block or its guard band are never trusted as edges: the
    # lines right beside a crossing are where the other stroke's bristle
    # streaks touch this one and widen the run by a few pixels, and bridging
    # from them put a notch at every crossing.
    tainted = set()
    for b0, b1 in blocks:
        tainted.update(range(b0 - GUARD, b1 + GUARD + 1))
    clean = {i: raw[i] for i in keys if i not in tainted}
    out = dict(clean)
    def fit(rows, which):
        pts = [(i, clean[i][which]) for i in rows if i in clean]
        if len(pts) < 2: return None
        n = len(pts); mi = sum(q[0] for q in pts) / n; mv = sum(q[1] for q in pts) / n
        var = sum((q[0] - mi) ** 2 for q in pts) or 1
        slope = sum((q[0] - mi) * (q[1] - mv) for q in pts) / var
        return lambda i: mv + slope * (i - mi)
    for b0, b1 in blocks:
        above = range(b0 - GUARD - WINDOW, b0 - GUARD); below = range(b1 + GUARD + 1, b1 + GUARD + 1 + WINDOW)
        both = list(above) + list(below)
        fits = [fit(both, which) or fit(above, which) or fit(below, which) for which in (0, 1)]
        for i in range(b0 - GUARD - WINDOW, b1 + GUARD + WINDOW + 1):
            if i not in raw: continue
            # Inside the band the fit is the edge. Across the fifty clean
            # lines either side it is blended back into the real edge, so
            # the two meet without the jog that a hard switch left.
            if i < b0 - GUARD: w = 1 - (b0 - GUARD - i) / WINDOW
            elif i > b1 + GUARD: w = 1 - (i - b1 - GUARD) / WINDOW
            else: w = 1
            edges = []
            for which in (0, 1):
                f = fits[which]; r = out.get(i, raw[i])[which]
                edges.append(r + w * (f(i) - r) if f else r)
            out[i] = (edges[0], edges[1])
    return out, typical

paths = [parse(d) for d in GUIDES]
outlines = []
for n in range(4):
    o, typical = outline(paths[n], AXIS[n])
    outlines.append(o)
    print(f"s{n + 1}: outline on {len(o)} {'rows' if AXIS[n] == 'y' else 'columns'}, typical width {typical:.0f}px")

def inside(n, x, y):
    o = outlines[n]
    if AXIS[n] == "y":
        e = o.get(y); return e is not None and e[0] - 0.5 <= x <= e[1] + 0.5
    e = o.get(x); return e is not None and e[0] - 0.5 <= y <= e[1] + 0.5

def gap(n, x, y):
    """How far a pixel sits from stroke n's outline: the straight-line
    distance to the nearest point of the outlined body, over every row or
    column the body has. The bristle streaks at a stroke's ragged edge are
    separated from the body by a pixel or two, so they fall outside the
    run; the nearest OUTLINE is theirs, where the nearest centerline would
    hand a bar's streak to the vertical it ends beside. (Measuring only in
    the pixel's own row, with a penalty when the stroke had no outline
    there, gave the specks above the first vertical's top to the second
    vertical, which did have an outline on that row, 100px away.)"""
    o = outlines[n]
    best = 1e9
    along, across = (y, x) if AXIS[n] == "y" else (x, y)
    for i, (lo, hi) in o.items():
        d_along = i - along
        if abs(d_along) >= best: continue
        d_across = 0 if lo - 0.5 <= across <= hi + 0.5 else min(abs(across - lo), abs(across - hi))
        best = min(best, math.hypot(d_along, d_across))
    return best

layers = [bytearray(W * H) for _ in range(4)]
counts = [0] * 4; spatter = 0
for y in range(H):
    for x in range(W):
        v = a[y * W + x]
        if not v:
            continue
        # Every painted pixel is assigned, down to the faintest edge, so the
        # layers recombine to the original exactly.
        k = next((n for n in (0, 1, 2, 3) if inside(n, x, y)), None)
        if k is None:
            k = min(range(4), key=lambda n: gap(n, x, y)); spatter += 1
        layers[k][y * W + x] = v; counts[k] += 1
print("pixels per stroke", counts, "of which spatter by nearest outline", spatter)
for n, l in enumerate(layers, 1):
    open(f"/tmp/rtp-s{n}.gray", "wb").write(bytes(l))
    run("convert", "-size", f"{W}x{H}", "-depth", "8", f"gray:/tmp/rtp-s{n}.gray", f"/tmp/rtp-s{n}.png")
    run("convert", "-size", f"{W}x{H}", "xc:#00DFDF", f"/tmp/rtp-s{n}.png", "-alpha", "off", "-compose", "CopyOpacity", "-composite", "-resize", "640x", "-quality", "85", "-define", "webp:alpha-quality=90", f"{B}/hash-s{n}.webp")
out = subprocess.run(["bash", "-c", f"compare -metric AE <(convert /tmp/rtp-s1.png /tmp/rtp-s2.png /tmp/rtp-s3.png /tmp/rtp-s4.png -evaluate-sequence Max png:-) <(convert {B}/hash.png -alpha extract png:-) null:"], capture_output=True, text=True)
print("pixels that differ from the original after recombining:", out.stderr.strip(), "(want 0)")
# The check that matters: bar pixels in a vertical's layer must all lie inside that vertical's outline (the crossings), never beyond it.
for v in (0, 1):
    stray = sum(1 for y in range(H) for x in range(W) if layers[v][y * W + x] and (inside(2, x, y) or inside(3, x, y)) and not inside(v, x, y))
    print(f"s{v + 1}: bar-outline pixels outside the vertical's own outline: {stray} (want 0)")
