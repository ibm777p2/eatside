# Eatside — Residency landing page

Landing page for Eatside ("Residency: Transforming Dark Restaurants Into Viral Dining"), built from the
`Eatside App.pdf` pitch deck — same copy, photography, palette and layout language.

**Stack:** Next.js 15 (App Router) · React 19 · Three.js via `@react-three/fiber` + `drei` · Framer Motion · Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 18.18+ (20 LTS or newer recommended).

## Structure

```
app/                  layout, page, global styles (brand tokens live at the top of globals.css)
lib/content.ts        every piece of copy from the deck — edit text here
components/sections/  one file per page section, in deck order
components/three/     3D scenes: HeroScene (floating bowl), FlywheelScene (marketplace loop), PlatesScene (30 guests)
public/images/        photos extracted from the deck
```

## Notes

- The logo (`components/logoPaths.ts`, `app/icon.svg`) is the vector artwork extracted from the deck, not a font
  approximation. Letters use `currentColor`, so the wordmark is black on light backgrounds and white on dark ones.
- Internal deck material is intentionally not on the site: unit economics, go-to-market phases, customer
  acquisition strategy, platform margin, and the brand-identity / colour-palette slides.

## Before launch

- The "Join the residency" form in `components/sections/Cta.tsx` is front-end only. Hook `onSubmit` up to your
  waitlist / CRM.
- Hex values in the deck's palette slide were all placeholder (`#728D6E`), so the colour tokens in `globals.css`
  were sampled from the swatches themselves. Swap in exact brand hex codes if you have them.
