import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { PrivacyPage } from './PrivacyPage'
import { Site } from './Site'
import { languageOfPath, pageOfPath } from './siteData'
import './styles.css'

const lang = languageOfPath(location.pathname)
document.documentElement.lang = lang
const root = document.getElementById('root')!
const app = (
  <StrictMode>
    {pageOfPath(location.pathname) === 'privacy' ? <PrivacyPage lang={lang} /> : <Site lang={lang} />}
  </StrictMode>
)

// The built pages arrive prerendered (scripts/prerender-site.mjs); the dev server sends an empty root.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
