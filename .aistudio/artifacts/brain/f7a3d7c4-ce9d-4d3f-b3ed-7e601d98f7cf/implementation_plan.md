# Hero Portrait Frame: Static Circular Avatar Redesign

Convert the organic morphing pebble portrait container in the hero section into a clean, borderless static circular container (`rounded-full`) with a subtle soft backdrop wash, framing the developer's portrait with refined minimalist precision.

## User Review & Critical Decisions

> [!IMPORTANT]
> - **Container Geometry**: The animated/asymmetrical `pebble-mask` and `pebble-animated` classes will be replaced with a static circular container (`rounded-full`).
> - **Framing Style**: Clean, borderless presentation with a soft ambient neutral/indigo backdrop tint, keeping the portrait centered and crisp without morphing movement.

- **Confirmed Decision 1**: Use `rounded-full` with `overflow-hidden` for a pristine static circle geometry.
- **Confirmed Decision 2**: Retain clean responsive dimensions (`w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]`) and optimal portrait scaling (`object-cover object-top scale-105`).

---

## 1. Overview & Core Concept

- **What It Does**: Streamlines the hero visual composition by switching from an asymmetric organic pebble blob to a classic, timeless static circle avatar.
- **Key Value**: Provides a balanced, stable focal anchor on the right side of the hero section that complements the clean minimalist dashboard aesthetic.

---

## 2. User Experience & Visual Design

- **Visual Form**: A perfect circle (`rounded-full`) holding the developer's full-body photo (`/images/fullbody.png`).
- **Surface & Backdrop**: A gentle gradient background (`bg-gradient-to-tr from-slate-200 via-indigo-50 to-indigo-100/70`) with a soft underlying ambient glow (`blur-2xl bg-indigo-100/40`), clean and borderless.
- **Behavior**: Completely static — no keyframe morphing or radius shifts.

---

## 3. Technical Changes

### Component Changes
1. `src/components/Hero.tsx`:
   - Replace `pebble-mask pebble-animated` with `rounded-full`.
   - Ensure clean `overflow-hidden` and circular geometry.
2. `src/index.css`:
   - Clean up pebble animation classes if no longer referenced.
