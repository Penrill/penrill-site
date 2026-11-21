# Site components

The landing page is built from the Oatmeal site template by Tailwind Labs (Mist colours, Mona Sans
headings). These files come from it and are subject to the
[Tailwind Plus license](https://tailwindcss.com/plus/license), not to Penrill's license. The complete
original download is kept locally in `vendor/oatmeal-mist-mona`, which is not committed.

Only the parts the page uses are kept here, with these changes:

- links are plain `<a>` elements instead of Next.js `Link`;
- the mobile menu is a native popover and the FAQ answers are `<details>`, so the prerendered page
  works without Tailwind Plus Elements;
- the footer shows the Penrill logo instead of a newsletter form, and the download cards can show a
  title above their list and a row under the grid.

Add other sections from the local template when the page needs them.
