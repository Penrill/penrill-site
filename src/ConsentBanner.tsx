import { useEffect, useState } from 'react'
import { analyticsEnabled, currentConsent, OPEN_CONSENT_EVENT, setConsent, startAnalytics, stopAnalytics, type Consent } from './analytics'
import { messages, type SiteLanguage } from './messages'
import { pagePath } from './siteData'

/**
 * Asks before any analytics loads. Accepting and declining are equally easy, and the footer's
 * "Cookie settings" link brings the banner back to change the choice. It renders only in the
 * browser: the prerendered page never contains it.
 */
export function ConsentBanner({ lang }: { lang: SiteLanguage }) {
  const [open, setOpen] = useState(false)
  const t = (key: keyof typeof messages.en) => messages[lang][key]

  useEffect(() => {
    if (!analyticsEnabled) return
    const consent = currentConsent()
    if (consent === 'granted') startAnalytics()
    // Declined, or Global Privacy Control over an older grant: remove cookies from an earlier visit.
    if (consent === 'denied') stopAnalytics()
    if (consent === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null
  const choose = (consent: Consent) => {
    setConsent(consent)
    setOpen(false)
  }
  // A browser sending Global Privacy Control counts as declined, so Accept would have no lasting effect.
  const canAccept = !navigator.globalPrivacyControl
  const button = 'inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 text-sm/7 font-medium'

  return (
    <section
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl bg-white p-5 text-mist-950 shadow-xl ring-1 ring-mist-950/10 sm:left-auto sm:max-w-sm dark:bg-mist-900 dark:text-white dark:ring-white/10"
    >
      <h2 id="consent-title" className="text-base/7 font-semibold">{t('consent.title')}</h2>
      <p id="consent-text" className="mt-1 text-sm/6 text-mist-700 dark:text-mist-400">
        {t('consent.text')}{' '}
        <a href={pagePath(lang, 'privacy')} className="font-medium text-mist-950 underline underline-offset-4 dark:text-white">
          {t('consent.more')}
        </a>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className={button + ' bg-mist-950/10 text-mist-950 hover:bg-mist-950/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'}
        >
          {t('consent.decline')}
        </button>
        {canAccept && (
          <button
            type="button"
            onClick={() => choose('granted')}
            className={button + ' bg-mist-950 text-white hover:bg-mist-800 dark:bg-mist-300 dark:text-mist-950 dark:hover:bg-mist-200'}
          >
            {t('consent.accept')}
          </button>
        )}
      </div>
    </section>
  )
}

/** Footer link that shows the banner again; only there when analytics is set up. */
export function ConsentSettingsLink({ lang }: { lang: SiteLanguage }) {
  if (!analyticsEnabled) return null
  return (
    <li className="text-mist-700 dark:text-mist-400">
      <button type="button" className="cursor-pointer text-left" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
        {messages[lang]['consent.settings']}
      </button>
    </li>
  )
}
