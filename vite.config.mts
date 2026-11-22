import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The landing page. `npm run build` builds it into dist/, then scripts/prerender.mjs renders every
// language into static HTML (dist/index.html and dist/uk/index.html).
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
