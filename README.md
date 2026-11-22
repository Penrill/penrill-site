# Penrill site

The landing page at [penrill.com](https://penrill.com/) for [Penrill](https://github.com/Penrill/penrill),
a free infinite whiteboard for pen tablets.

```bash
npm install
npm run dev        # http://localhost:5173/ (English) and /uk/
npm run build      # static site in dist/, one prerendered page per language
npm run typecheck
```

- `src/`: the page (React + Tailwind), prerendered by `scripts/prerender.mjs`.
- `public/connect/`: the page Penrill Server links to for connecting a device.
- `public/app/`: forwards old `penrill.com/app/` links to the web app at
  [app.penrill.com](https://app.penrill.com/).

Pushing to `main` publishes the site with GitHub Pages (`.github/workflows/pages.yml`).
Set the `GA_MEASUREMENT_ID` repository variable to turn on Google Analytics behind the consent banner.

Licensed under FSL-1.1-MIT, except the template components in `src/components`
(see [src/components/README.md](src/components/README.md)).
