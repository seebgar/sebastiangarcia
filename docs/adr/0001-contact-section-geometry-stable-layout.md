# 0001 — Contact section: geometry-stable layout

The Contact section's image used to be sized `height: 100svh` with the
contact card absolutely positioned over it; the section itself was also
`min-height: 100svh`. On iOS Safari (mobile + iPad), scrolling near the
bottom triggered the URL-bar collapse animation, which re-evaluated
viewport-height units and forced the view-timeline parallax on the card to
recompute its progress — producing a visible scale change and a brief
freeze.

We restructured the section to remove every viewport-height dimension. The
background image is now sized by `aspect-ratio` (breakpoint-tuned). The
card and image share a single CSS Grid cell (`grid-area: 1 / 1`) instead of
living in two coordinate systems; the empty `<div>&nbsp;</div>` sentinel
goes away. The section's `min-height: 100svh` is dropped — the image
carries the full visual presence via its aspect ratio.

Two prior positions are reversed:

- **Parallax now runs at every breakpoint** (tuned smaller on small
  viewports, larger on desktop), not gated to ≥768px. The original gate
  existed because parallax was glitchy on touch; with geometry stable, the
  gate is unnecessary.
- **`prefers-reduced-motion: reduce` now disables the parallax.** The
  project previously did not gate motion (locked in by `tests/css.test.ts`);
  expanding parallax to touch devices makes honoring the OS preference the
  responsible default. `css.test.ts` flips: it now asserts the gate exists.

Other full-height sections (e.g. `.about`) still use `100svh` — the Contact
section is intentionally different because the parallax × viewport
interaction is unique to it.
