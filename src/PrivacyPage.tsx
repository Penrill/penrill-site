import { ConsentBanner, ConsentSettingsLink } from './ConsentBanner'
import { Container } from './components/elements/container'
import { Main } from './components/elements/main'
import { pageInfo, type SiteLanguage } from './messages'
import { privacy, UPDATED } from './privacy'
import { asset, pagePath, rememberLanguage } from './siteData'

/** The privacy policy, prerendered like the landing page at privacy/ and uk/privacy/. */
export function PrivacyPage({ lang }: { lang: SiteLanguage }) {
  const text = privacy[lang]
  const other: SiteLanguage = lang === 'uk' ? 'en' : 'uk'
  const date = new Date(UPDATED + 'T00:00:00Z').toLocaleDateString(lang === 'uk' ? 'uk-UA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

  return (
    <>
      <header className="py-6">
        <Container className="flex items-center justify-between gap-4">
          <a href={pagePath(lang)} className="inline-flex items-center gap-2 text-mist-950 dark:text-white">
            <img src={asset('img/icon.png')} alt="" width={32} height={32} className="size-8" />
            <span className="font-logo text-xl font-medium tracking-tight">Penrill</span>
          </a>
          <a
            href={pagePath(other, 'privacy')}
            hrefLang={other}
            lang={other}
            onClick={() => rememberLanguage(other)}
            className="text-sm/7 font-medium text-mist-700 hover:text-mist-950 dark:text-mist-400 dark:hover:text-white"
          >
            {pageInfo[other].language}
          </a>
        </Container>
      </header>
      <Main>
        <Container className="pt-10 pb-24 lg:max-w-3xl">
          <article className="text-mist-700 dark:text-mist-400 [&_a]:font-medium [&_a]:text-mist-950 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white [&_b]:font-semibold [&_b]:text-mist-950 dark:[&_b]:text-white">
            <h1 className="font-display text-4xl/tight font-medium tracking-tight text-mist-950 sm:text-5xl/tight dark:text-white">{text.title}</h1>
            <p className="mt-4 text-sm/6">
              {text.updated}: <time dateTime={UPDATED}>{date}</time>
            </p>
            {text.sections.map((section) => (
              <section key={section.title} className="mt-12">
                <h2 className="font-display text-2xl/8 font-medium tracking-tight text-mist-950 dark:text-white">{section.title}</h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="mt-4 text-base/7" dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </section>
            ))}
          </article>
          <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-mist-950/10 pt-8 text-sm/7 dark:border-white/10">
            <li className="text-mist-700 dark:text-mist-400">
              <a href={pagePath(lang)}>{text.back}</a>
            </li>
            <ConsentSettingsLink lang={lang} />
          </ul>
        </Container>
      </Main>
      <ConsentBanner lang={lang} />
    </>
  )
}
