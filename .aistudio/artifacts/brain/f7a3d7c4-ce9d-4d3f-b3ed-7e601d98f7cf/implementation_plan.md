# Printed Photo Frame & Centered Subject Redesign

Adapt the hero profile photo presentation to the printed photo style shown in the uploaded reference (`Minimalist UX Designer Portfolio Dashboard.png`): a paper-print card with white photo margins, a subtle rotation tilt, realistic soft drop shadow, and a semi-translucent washi tape accent pinned at the top, while centering the portrait body with `object-position: center`.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following styling and framing specifications are confirmed based on user feedback:
> - **Printed Photo Frame**: A crisp white photo paper card with generous white borders (`p-3.5 sm:p-4 bg-white rounded-xs sm:rounded-sm shadow-2xl`), tilted at a subtle organic angle (`rotate-2` or `rotate-[2.5deg]`).
> - **Translucent Washi Tape Accent**: A semi-translucent tape strip pinned over the top center of the photo (`w-24 sm:w-28 h-7 bg-amber-100/70 border-t border-b border-amber-200/40 backdrop-blur-2xs shadow-xs -top-3.5`).
> - **Centered Subject Alignment**: Image styling updated with `object-cover object-center` (and calibrated scale) so the developer's body and face are centered within the photo print.
> - **Exclusion**: No decorative handwritten cursive text notes beside the photo, maintaining a clean, professional aesthetic.

- **Confirmed Decision 1**: Replace the circular container with the physical printed photo card element.
- **Confirmed Decision 2**: Ensure responsive sizing (`w-64 sm:w-80 lg:w-[350px] aspect-[4/5]` or matching natural portrait proportions) that balances against the hero typography.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces the circular avatar with a physical printed photo pinned to the canvas with translucent tape.
- **Key Value**: Delivers the tactile, human-crafted editorial look featured in the latest reference design while properly centering the subject's posture and face.

---

## 2. User Experience & Visual Design

- **Card Composition**:
  - Pure white background paper surface (`bg-white`).
  - White photo borders on all sides (`p-3 sm:p-4 pb-4 sm:pb-6`).
  - Realistic multi-layered shadow (`shadow-[0_20px_45px_rgba(15,23,42,0.12)]`).
  - Slight organic rotation (`rotate-[2.5deg] hover:rotate-0 transition-transform duration-300`).
- **Washi Tape Strip**:
  - Positioned at the top-center edge, slightly rotated (`-rotate-1`).
  - Realistic semi-translucent parchment tone (`bg-stone-200/60` or `bg-amber-100/70` with subtle edge serration or border).
- **Photo Framing**:
  - `object-cover object-center` ensuring the subject's body and head are centered.

---

## 3. Technical Changes

### Component Changes
1. `src/components/Hero.tsx`:
   - Replace the `rounded-full` circle wrapper with the tilted printed photo card.
   - Insert the top washi tape accent strip.
   - Update `img` styles to `object-cover object-center` with smooth rendering and rounded inner corners.
