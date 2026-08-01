# 🐾 AniVision AI

A premium, production-shaped frontend for an AI-powered Cat vs. Dog image
classifier — built with React 19, Vite, Tailwind CSS, and Framer Motion.

This repo is **frontend only**. The classification model itself is not
included; every network call is centralized in `src/services/api.js` behind
clearly marked `// TODO:` placeholders so you can wire up your own FastAPI
backend without touching any component.

---

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Connecting your backend

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your FastAPI
   server's URL.
2. Open `src/services/api.js` and uncomment the real `axios` calls inside
   `predictImage`, `getHistory`, `deletePrediction`, and `getAnalytics`.
3. In `src/hooks/usePrediction.js`, replace the block marked
   `--- DEMO SIMULATION ---` with a real call to `predictImage(formData)`
   from `services/api.js`. Everything downstream (the result card, the
   history context, the scanning animation) already expects the same
   `{ label, confidence, predictionTimeMs }` shape, so no other file needs
   to change.
4. The Analytics and About Model pages currently read from
   `src/utils/mockData.js`. Swap those imports for a `getAnalytics()` call
   (e.g. inside a `useEffect`) once your backend exposes real metrics.

---

## Project structure

```
src/
  assets/          images & icons
  components/
    layout/        Navbar, Footer, Layout shell
    ui/             Button, GlassCard — the base design system
    prediction/     UploadCard, ScanningAnimation, ResultCard, PredictionCard
    analytics/      StatCard, AnimatedCounter, ChartCard
    common/         Background, Hero, FeatureCard, SectionHeading, Loader, PageTransition
  context/          PredictionContext (Context API — shared prediction history)
  hooks/            usePrediction, useHistory
  pages/            Home, Predict, Analytics, AboutModel, History, NotFound
  routes/           AppRoutes.jsx — all route definitions
  services/         api.js — every network call lives here
  utils/            formatters.js, mockData.js
  App.jsx
  main.jsx
  index.css
```

## Design tokens

| Token       | Hex       |
|-------------|-----------|
| Background  | `#030712` |
| Card        | `#111827` |
| Primary     | `#3B82F6` |
| Secondary   | `#8B5CF6` |
| Accent      | `#06B6D4` |
| Success     | `#22C55E` |
| Danger      | `#EF4444` |
| Text        | `#F9FAFB` |
| Muted       | `#9CA3AF` |

All tokens are defined in `tailwind.config.js` and used exclusively via
Tailwind utility classes — no hardcoded hex values inside components.

## Tech stack

React 19 · Vite · Tailwind CSS · Framer Motion · React Router DOM · Axios ·
Lucide React · React Dropzone · Recharts · Context API
