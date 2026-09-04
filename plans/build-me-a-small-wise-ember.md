# Plan: Digital Equipment Operation Instructions Website

## Context

A multi-space instructions website for staff and visitors to quickly look up how to operate AV/digital equipment in classrooms, meeting rooms, and halls. The homepage lists available spaces; each space has its own page with step-by-step device operation guides. Needs to feel trustworthy, scannable, and modern.

## Aesthetic Stance: Minimalist

**Ground:** Deep slate (`#0f172a`) with `#f8fafc` light panels — dark side-nav or top-bar anchors the UI while content areas remain bright and readable.  
**Accent:** Teal-cyan (`#0ea5e9`) for interactive elements, step numbers, and CTAs.  
**Typography:**
- Display/headings: `Instrument Serif` (Google Fonts) — refined, institutional authority  
- Body/UI: `DM Sans` (Google Fonts) — clean, neutral, legible  
- Mono labels: `DM Mono` for device names, step counters

**Color tokens (in `src/index.css`):**
```
--background: #f8fafc;
--foreground: #0f172a;
--card: #ffffff;
--card-foreground: #0f172a;
--primary: #0ea5e9;
--primary-foreground: #ffffff;
--secondary: #1e293b;
--secondary-foreground: #f1f5f9;
--muted: #f1f5f9;
--muted-foreground: #64748b;
--accent: #0ea5e9;
--accent-foreground: #ffffff;
--border: #e2e8f0;
--ring: #0ea5e9;
--radius: 0.75rem;
```

## Architecture

Everything lives in `src/App.tsx` (single-file SPA with React state, no router needed at this scale).

**Views:**
1. `HomeView` — Hero header + grid of space cards. Each card has a photo, space name, short description, device count badge.
2. `SpaceView` — Breadcrumb back to home, space hero image + title, then a list of devices. Each device expands (accordion) to reveal numbered steps.

**State:** `useState` for `currentSpace: string | null`. `null` = home, a space id = detail page.

## Content (realistic placeholder)

**Spaces:**
- Classroom A101 — Projector, Wireless Mic, Document Camera
- Classroom B205 — Interactive Whiteboard, Sound System
- Meeting Room 301 — Video Conferencing System (Teams/Zoom), TV Display, Wireless Presentation (ClickShare)
- Meeting Room 402 — Smart TV, Wireless Mic
- Main Hall — Stage Lighting Console, PA System, Live Stream Encoder
- Seminar Hall — Dual Projectors, Podium Mic, Recording System

**Photos:** Unsplash photos for each space (classroom, meeting room, auditorium/hall).

## Files to modify

- `src/index.css` — Google Font imports (top), Tailwind import, CSS custom properties
- `src/App.tsx` — Full implementation (HomeView + SpaceView + data + state)

## Implementation steps

1. Add Google Fonts `@import` for Instrument Serif, DM Sans, DM Mono at the top of `src/index.css`
2. Define CSS custom properties + font-family defaults in `src/index.css`
3. Build `src/App.tsx`:
   - Data array of spaces with devices and steps
   - `HomeView` component — hero, space card grid with Unsplash photos
   - `SpaceView` component — breadcrumb, space header, accordion device list with numbered steps
   - Root `App` with `useState` wiring navigation between views
4. Wire hover states, smooth transitions, focus rings, responsive grid collapse at ~768px

## Verification

- Preview in the browser panel: homepage shows space cards, clicking one navigates to the detail page, accordion opens/closes per device, back button returns to homepage
- Responsive: grid collapses on narrow widths
- No TypeScript errors (clean JSX, balanced braces, closed tags)
