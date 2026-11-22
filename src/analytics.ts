/**
 * Google Analytics for the landing page only (never the app or the web version, which collect
 * nothing). Nothing from Google loads until the visitor accepts in the consent banner, and a
 * browser that sends Global Privacy Control counts as having declined.
 *
 * The measurement ID comes from VITE_GA_ID at build time (the GA_MEASUREMENT_ID repository variable
 * in the Pages workflow). Without it, as in forks and local builds, there is no analytics and no banner.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    [disable: `ga-disable-${string}`]: boolean | undefined
  }
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

const GA_ID: string = import.meta.env.VITE_GA_ID ?? ''
export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_ID)

export type Consent = 'granted' | 'denied'
const CONSENT_KEY = 'penrill-analytics-consent'
/** The footer's "Cookie settings" link fires this to show the banner again. */
export const OPEN_CONSENT_EVENT = 'penrill:consent-settings'

export function storedConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/**
 * What applies on load: "denied" for a browser that asks for no tracking (Global Privacy Control),
 * even over an older "granted", otherwise the visitor's stored choice. The banner offers no Accept
 * to such a browser, so there is no choice that would be silently ignored.
 */
export function currentConsent(): Consent | null {
  return navigator.globalPrivacyControl ? 'denied' : storedConsent()
}

export function setConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    // Without storage the choice holds for this page view only.
  }
  if (consent === 'granted') startAnalytics()
  else stopAnalytics()
}

let started = false

// gtag.js expects the arguments object itself, not an array.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

const CONFIG = { allow_google_signals: false, allow_ad_personalization_signals: false }

export function startAnalytics() {
  if (!analyticsEnabled) return
  // Also turns measurement back on after a withdrawal in the same page view.
  window[`ga-disable-${GA_ID}`] = false
  if (started) {
    // Re-accepted after a withdrawal: send a hit so this page view is measured and the cookie returns.
    gtag('config', GA_ID, CONFIG)
    return
  }
  started = true
  // Only measurement: no advertising storage, no ad signals, no Google signals.
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  })
  gtag('js', new Date())
  gtag('config', GA_ID, CONFIG)
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(script)
}

/** Withdrawn consent: stop sending and delete the cookies Google Analytics set. */
export function stopAnalytics() {
  if (!analyticsEnabled) return
  window[`ga-disable-${GA_ID}`] = true
  deleteGoogleCookies()
}

/** Google sets its cookie on a parent domain we cannot know in advance, so try every suffix of the host. */
function deleteGoogleCookies() {
  const labels = location.hostname.split('.')
  const domains = ['']
  // Skip the last label alone (a top-level domain such as "com"), which browsers reject.
  const last = labels.length > 1 ? labels.length - 1 : labels.length
  for (let i = 0; i < last; i++) {
    const suffix = labels.slice(i).join('.')
    domains.push(suffix, '.' + suffix)
  }
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? '; domain=' + domain : ''}${secure}`
    }
  }
}
