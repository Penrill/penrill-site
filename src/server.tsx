import { renderToString } from 'react-dom/server'
import { Site } from './Site'
import { pageInfo, type SiteLanguage } from './messages'
import { LANGUAGE_KEY, LANGUAGES, pagePath, RELEASES } from './siteData'

/** Build-time entry: scripts/prerender-site.mjs turns each language into a static HTML page. */

export const SITE_ORIGIN = 'https://penrill.com'
const pageUrl = (lang: SiteLanguage) => SITE_ORIGIN + pagePath(lang)
const IMAGE = SITE_ORIGIN + import.meta.env.BASE_URL + 'img/social-preview.png'
const LOCALE = { uk: 'uk_UA', en: 'en_US' } as const

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Ukrainian-speaking visitors who land on the English root page go to uk/, unless they picked
 * English with the language switch. Only the root page has it: crawlers read both pages as is.
 */
const languageRedirect = `<script>(function(){var s;try{s=localStorage.getItem(${JSON.stringify(LANGUAGE_KEY)})}catch(e){}` +
  `if(s==='en')return;if(s==='uk'||(navigator.languages||[navigator.language]).some(function(l){return /^uk\\b/i.test(l)}))` +
  `location.replace(${JSON.stringify(pagePath('uk'))}+location.hash)})()</script>`

const REPO_URL = 'https://github.com/Penrill/penrill'

/**
 * Structured data (schema.org JSON-LD): tells search engines this page is a free desktop app for
 * Windows, macOS and Linux, which makes it eligible for software rich results.
 */
function structuredData(lang: SiteLanguage): string {
  const info = pageInfo[lang]
  const url = pageUrl(lang)
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: pageUrl('en'),
        name: 'Penrill',
        inLanguage: [...LANGUAGES]
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Penrill',
        url: pageUrl('en'),
        logo: SITE_ORIGIN + import.meta.env.BASE_URL + 'img/icon.png',
        sameAs: ['https://github.com/Penrill']
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#app`,
        name: 'Penrill',
        description: info.description,
        url,
        inLanguage: lang,
        image: IMAGE,
        applicationCategory: 'EducationalApplication',
        applicationSubCategory: 'Whiteboard',
        operatingSystem: 'Windows, macOS, Linux',
        downloadUrl: RELEASES,
        installUrl: RELEASES,
        isAccessibleForFree: true,
        license: `${REPO_URL}/blob/main/LICENSE`,
        codeRepository: REPO_URL,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      }
    ]
  }
  // `<` is escaped so no text inside can close the script element.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function head(lang: SiteLanguage): string {
  const info = pageInfo[lang]
  const other = LANGUAGES.filter((code) => code !== lang)
  return [
    `<title>${escape(info.title)}</title>`,
    `<meta name="description" content="${escape(info.description)}">`,
    `<link rel="canonical" href="${pageUrl(lang)}">`,
    ...LANGUAGES.map((code) => `<link rel="alternate" hreflang="${code}" href="${pageUrl(code)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('en')}">`,
    `<meta property="og:title" content="${escape(info.title)}">`,
    `<meta property="og:description" content="${escape(info.description)}">`,
    `<meta property="og:url" content="${pageUrl(lang)}">`,
    `<meta property="og:locale" content="${LOCALE[lang]}">`,
    ...other.map((code) => `<meta property="og:locale:alternate" content="${LOCALE[code]}">`),
    `<meta property="og:image" content="${IMAGE}">`,
    `<meta property="og:image:alt" content="${escape(info.shareAlt)}">`,
    `<meta name="twitter:image" content="${IMAGE}">`,
    `<meta name="twitter:image:alt" content="${escape(info.shareAlt)}">`,
    structuredData(lang),
    ...(lang === 'en' ? [languageRedirect] : [])
  ].join('\n')
}

export interface Page {
  lang: SiteLanguage
  /** Output path inside the site folder. */
  file: string
  head: string
  html: string
}

export function renderPages(): Page[] {
  return LANGUAGES.map((lang) => ({
    lang,
    file: (lang === 'en' ? '' : lang + '/') + 'index.html',
    head: head(lang),
    html: renderToString(<Site lang={lang} />)
  }))
}

/**
 * Every language page with its alternates, the same set as the hreflang links in the head.
 * `lastmod` is when the site last changed (the date of the commit it is built from); search engines
 * use it to decide when to crawl again, so it must not be the build time of an unchanged page.
 */
export function sitemap(lastmod?: string): string {
  const alternates = [
    ...LANGUAGES.map((code) => [code, pageUrl(code)]),
    ['x-default', pageUrl('en')]
  ]
  const links = alternates.map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${href}"/>`).join('\n')
  const modified = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
  const urls = LANGUAGES.map((lang) => `  <url>\n    <loc>${pageUrl(lang)}</loc>${modified}\n${links}\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
}

/**
 * Everything may be crawled. The connect page and the 404 page carry `noindex` themselves:
 * blocking them here would hide that tag from crawlers and could still leave them in the index.
 */
export function robots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}${import.meta.env.BASE_URL}sitemap.xml\n`
}
