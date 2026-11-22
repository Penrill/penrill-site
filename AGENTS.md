# Penrill site: notes for coding agents

The landing page at penrill.com for Penrill, a free infinite whiteboard for pen tablets. The app
itself lives in [Penrill/penrill](https://github.com/Penrill/penrill); its web version is at
https://app.penrill.com/. This repo imports no app code.

- Stack: Vite + React + Tailwind. `npm run build` builds into `dist/` and `scripts/prerender.mjs`
  renders one static HTML page per language (`src/server.tsx`), so search engines get the full text.
- Text: English + Ukrainian only (`src/messages.ts`). No Russian localization. Code, docs and commits in English.
- Writing (page text, docs, commits, comments): no em dashes; rephrase instead.
- Sections come from Tailwind's Oatmeal template: read `src/components/README.md` before adding one.
- `public/connect/` is the connect page that Penrill Server links to (`https://penrill.com/connect`).
  Keep its address and its `#server=…&pin=…` parameters working.
- `public/app/` only forwards old `penrill.com/app/…` links to app.penrill.com and retires the old
  service worker. Don't put the app back here.
- Before committing run: `npm run typecheck && npm run build`.
