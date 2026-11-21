import { useEffect, useState, type ComponentType, type ComponentProps } from 'react'
import { AnnouncementBadge } from './components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from './components/elements/button'
import { Logo, LogoGrid } from './components/elements/logo-grid'
import { Main } from './components/elements/main'
import { Screenshot } from './components/elements/screenshot'
import { Section } from './components/elements/section'
import { ArrowNarrowRightIcon } from './components/icons/arrow-narrow-right-icon'
import { ChartLineIcon } from './components/icons/chart-line-icon'
import { CheckmarkIcon } from './components/icons/checkmark-icon'
import { ChevronIcon } from './components/icons/chevron-icon'
import { Document2StackedIcon } from './components/icons/document-2-stacked-icon'
import { DocumentIcon } from './components/icons/document-icon'
import { GitHubIcon } from './components/icons/github-icon'
import { HardDriveIcon } from './components/icons/hard-drive-icon'
import { LanguageIcon } from './components/icons/language-icon'
import { LockIcon } from './components/icons/lock-icon'
import { PencilOnSquareIcon } from './components/icons/pencil-on-square-icon'
import { PhotoIcon } from './components/icons/photo-icon'
import { SlidersIcon } from './components/icons/sliders-icon'
import { CallToActionSimple } from './components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from './components/sections/faqs-two-column-accordion'
import { Feature as ExampleCard } from './components/sections/features-two-column-with-demos'
import { Feature, FeaturesThreeColumn } from './components/sections/features-three-column'
import {
  FooterBrand,
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from './components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { HeroLeftAlignedWithDemo } from './components/sections/hero-left-aligned-with-demo'
import { NavbarLink, NavbarLogo, NavbarWithLinksActionsAndCenteredLogo } from './components/sections/navbar-with-links-actions-and-centered-logo'
import { Plan, PricingMultiTier } from './components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from './components/sections/stats-with-graph'
import { downloadNotes, messages, pageInfo, type SiteLanguage } from './messages'
import { AppleIcon, GlobeIcon, LinuxIcon, WindowsIcon } from './platform-icons'
import { asset, assetSize, detectOs, pagePath, RELEASES, rememberLanguage, useRelease, type Os } from './siteData'

const GITHUB = 'https://github.com/Penrill/penrill'
type Key = keyof typeof messages.en
type Wallpaper = ComponentProps<typeof Screenshot>['wallpaper']

const examples = [
  {
    image: 'formulas', title: 'ex.h0', caption: 'ex.c0', isNew: true,
    uk: 'Формули з клавіатури формул: парабола з обмеженням по x, функція g(x) = √(x + 4) і половина кола x² + y² = 9, обмежена по y, на одній площині; поруч 3/4 + 1/2 з відповіддю 1,25',
    en: 'Formulas from the math keypad: a parabola limited in x, the function g(x) = √(x + 4) and half of the circle x² + y² = 9, limited in y, on one plane; beside them 3/4 + 1/2 with the answer 1.25'
  },
  {
    image: 'geometry', title: 'ex.h1', caption: 'ex.c1',
    uk: 'Побудова рівностороннього трикутника: дуги циркулем, кут 60° на транспортирі',
    en: 'Constructing an equilateral triangle: compass arcs and a 60° angle on the protractor'
  },
  {
    image: 'graphs', title: 'ex.h2', caption: 'ex.c2',
    uk: 'Координатна площина з параболою y = x² − 2 і прямою y = x/2 + 1 та точками їх перетину',
    en: 'A coordinate plane with the parabola y = x² − 2, the line y = x/2 + 1 and their intersection points'
  },
  {
    image: 'solids', title: 'ex.h3', caption: 'ex.c3',
    uk: 'Куб, призма, піраміда, циліндр, конус, куля і шестикутна піраміда з пунктирними невидимими ребрами',
    en: 'Cube, prism, pyramid, cylinder, cone, sphere and a hexagonal pyramid with hidden edges dashed'
  },
  {
    image: 'text', title: 'ex.h4', caption: 'ex.c4',
    uk: 'Задача на теорему косинусів: «Дано», «Знайти», «Розв’язання» різними кольорами, відповідь виділено маркером',
    en: 'A law of cosines problem: Given, Find and Solution in different colours, the answer highlighted'
  },
  {
    image: 'home', title: 'ex.h5', caption: 'ex.c5',
    uk: 'Екран «Усі дошки»: прев’ю дощок, теги предметів і тем, закріплені дошки, пошук',
    en: 'The All boards screen: board previews, subject and topic tags, pinned boards, search'
  },
  {
    image: 'chalkboard', title: 'ex.h6', caption: 'ex.c6',
    uk: 'Зелена крейдова дошка з параболою, прямою й точками їх перетину в Penrill',
    en: 'A green chalkboard with a parabola, a line and their intersection points in Penrill'
  }
] as const

/** Examples in rows of two, three and two cards. */
const exampleRows = [[0, 1], [2, 3, 4], [5, 6]] as const
const wallpapers: Wallpaper[] = ['blue', 'purple', 'green', 'brown', 'blue', 'purple', 'green']

const features: { icon: ComponentType<{ className?: string }>; title: Key; text: Key }[] = [
  { icon: PencilOnSquareIcon, title: 'f.ink.t', text: 'f.ink.d' },
  { icon: SlidersIcon, title: 'f.wacom.t', text: 'f.wacom.d' },
  { icon: ChartLineIcon, title: 'f.fx.t', text: 'f.fx.d' },
  { icon: Document2StackedIcon, title: 'f.tpl.t', text: 'f.tpl.d' },
  { icon: PhotoIcon, title: 'f.img.t', text: 'f.img.d' },
  { icon: LockIcon, title: 'f.select.t', text: 'f.select.d' },
  { icon: LanguageIcon, title: 'f.lang.t', text: 'f.lang.d' },
  { icon: DocumentIcon, title: 'f.exp.t', text: 'f.exp.d' },
  { icon: HardDriveIcon, title: 'f.offline.t', text: 'f.offline.d' }
]

const platforms = [
  { os: 'win', name: 'Windows', icon: WindowsIcon, file: 'exe', get: 'd.get.exe', req: 'd.win.req', updates: 'u.win', badge: 'u.auto', first: 'd.first', steps: ['d.win.s1', 'd.win.s2'] },
  { os: 'mac', name: 'macOS', icon: AppleIcon, file: 'dmg', get: 'd.get.dmg', req: 'd.mac.req', updates: 'u.mac', badge: 'u.manual', first: 'd.first.mac', steps: ['d.mac.s1', 'd.mac.s2', 'd.mac.s3', 'd.mac.s4'] },
  { os: 'linux', name: 'Linux', icon: LinuxIcon, file: 'appimage', get: 'd.get.appimage', req: 'd.linux.req', updates: 'u.linux', badge: 'u.auto', first: 'd.first', steps: ['d.linux.s1', 'd.linux.s2'] }
] as const

const assetOf = { win: 'exe', mac: 'dmg', linux: 'appimage' } as const

/** Links and bold words inside translated strings, styled like Oatmeal's document text. */
const richText = '[&_a]:font-medium [&_a]:text-mist-950 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white [&_b]:font-medium [&_b]:text-mist-950 dark:[&_b]:text-white'

/** A screenshot of the app in the visitor's colour scheme. */
function Shot({ name, lang, alt, eager, className }: { name: string; lang: SiteLanguage; alt: string; eager?: boolean; className?: string }) {
  return (
    <picture className={['block overflow-hidden', className].filter(Boolean).join(' ')}>
      <source media="(prefers-color-scheme: dark)" srcSet={asset(`img/${name}-dark-${lang}.webp`)} />
      <img
        src={asset(`img/${name}-${lang}.webp`)}
        width={2000}
        height={1250}
        alt={alt}
        loading={eager ? undefined : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className="block h-auto w-full"
      />
    </picture>
  )
}

function useOpenDetailsFromHash() {
  // Links such as #why point at a closed FAQ answer: open it.
  useEffect(() => {
    const open = () => {
      const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (target instanceof HTMLDetailsElement) target.open = true
    }
    open()
    addEventListener('hashchange', open)
    return () => removeEventListener('hashchange', open)
  }, [])
}

/** The page for one language. Prerendered to HTML at build time (server.tsx), then hydrated. */
export function Site({ lang }: { lang: SiteLanguage }) {
  // The visitor's system is only known in the browser: the prerendered page starts without it.
  const [visitorOs, setVisitorOs] = useState<Os | null>(null)
  const { release, assets } = useRelease()
  const info = pageInfo[lang]
  const other: SiteLanguage = lang === 'uk' ? 'en' : 'uk'
  const t = (key: Key) => messages[lang][key]
  const rich = (key: Key) => ({ __html: t(key) })
  const webApp = asset('app/')
  const primaryHref = (visitorOs && assets[assetOf[visitorOs]]?.browser_download_url) || '#download'
  const downloadLabel = t('hero.download') + (visitorOs ? ' ' + info[visitorOs] : '')

  useEffect(() => setVisitorOs(detectOs()), [])
  useOpenDetailsFromHash()

  const languageLink = (className?: string) => (
    <PlainButtonLink href={pagePath(other)} hrefLang={other} lang={other} onClick={() => rememberLanguage(other)} className={className}>
      <LanguageIcon />
      {pageInfo[other].language}
    </PlainButtonLink>
  )

  const navLinks = (
    <>
      <NavbarLink href="#examples">{t('nav.examples')}</NavbarLink>
      <NavbarLink href="#features">{t('nav.features')}</NavbarLink>
      <NavbarLink href="#faq">{t('nav.faq')}</NavbarLink>
      <NavbarLink href={webApp}>{t('nav.web')}</NavbarLink>
    </>
  )

  const downloadButtons = (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonLink href={primaryHref} size="lg">{downloadLabel}</ButtonLink>
      <PlainButtonLink href={webApp} size="lg">
        {t('web.open')} <ArrowNarrowRightIcon />
      </PlainButtonLink>
    </div>
  )

  return (
    <>
      <NavbarWithLinksActionsAndCenteredLogo
        id="navbar"
        menuLabel={t('nav.menu')}
        links={navLinks}
        menuLinks={
          <>
            {navLinks}
            <NavbarLink href="#download">{t('nav.download')}</NavbarLink>
            <NavbarLink href={pagePath(other)} hrefLang={other} lang={other} onClick={() => rememberLanguage(other)}>
              {pageInfo[other].language}
            </NavbarLink>
          </>
        }
        logo={
          <NavbarLogo href="#top" className="items-center gap-2">
            <img src={asset('img/icon.png')} alt="" width={36} height={36} className="size-9" />
            <span className="font-logo text-xl font-medium tracking-tight text-mist-950 dark:text-white">Penrill</span>
          </NavbarLogo>
        }
        actions={
          <>
            {languageLink('max-sm:hidden')}
            <ButtonLink href="#download">{t('nav.download')}</ButtonLink>
          </>
        }
      />

      <Main id="top">
        <HeroLeftAlignedWithDemo
          id="hero"
          eyebrow={<AnnouncementBadge href={GITHUB} text={t('hero.badge')} cta={t('hero.badge.cta')} />}
          headline={t('hero.title')}
          subheadline={<p>{t('hero.lead')}</p>}
          cta={
            <div className="flex flex-col gap-4">
              {downloadButtons}
              <p className={`text-sm/7 text-mist-600 dark:text-mist-500 ${richText}`} dangerouslySetInnerHTML={{ __html: downloadNotes[lang][visitorOs ?? 'none'] }} />
            </div>
          }
          demo={
            <>
              <Screenshot className="rounded-md lg:hidden" wallpaper="blue" placement="bottom-right">
                <Shot name="hero" lang={lang} alt={info.heroAlt} eager className="w-[160%] max-w-none sm:w-[130%]" />
              </Screenshot>
              <Screenshot className="rounded-lg max-lg:hidden" wallpaper="blue" placement="bottom">
                <Shot name="hero" lang={lang} alt={info.heroAlt} eager />
              </Screenshot>
            </>
          }
          footer={
            <LogoGrid>
              {([
                ['Windows', WindowsIcon, '#download'],
                ['macOS', AppleIcon, '#download'],
                ['Linux', LinuxIcon, '#download'],
                [t('hero.browser'), GlobeIcon, webApp]
              ] as const).map(([name, Icon, href]) => (
                <Logo key={name}>
                  <a href={href} className="flex items-center gap-2.5 font-logo text-lg font-medium tracking-tight text-mist-950/70 hover:text-mist-950 dark:text-white/70 dark:hover:text-white">
                    <Icon className="size-6" />
                    {name}
                  </a>
                </Logo>
              ))}
            </LogoGrid>
          }
        />

        <Section id="examples" eyebrow={t('ex.kicker')} headline={t('ex.title')} subheadline={<p>{t('ex.sub')}</p>}>
          <div className="flex flex-col gap-2">
            {exampleRows.map((row) => (
              <div key={row[0]} className={`grid grid-cols-1 gap-2 ${row.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
                {row.map((index) => {
                  const example = examples[index]
                  return (
                    <ExampleCard
                      key={example.image}
                      demo={
                        <Screenshot wallpaper={wallpapers[index]} placement="bottom">
                          <Shot name={`ex-${example.image}`} lang={lang} alt={example[lang]} />
                        </Screenshot>
                      }
                      headline={
                        <span className="inline-flex items-center gap-3">
                          {t(example.title)}
                          {'isNew' in example && (
                            <span className="inline-flex rounded-full bg-mist-950/10 px-2 text-xs/6 font-medium text-mist-950 dark:bg-white/10 dark:text-white">
                              {t('ex.new')}
                            </span>
                          )}
                        </span>
                      }
                      subheadline={<p>{t(example.caption)}</p>}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </Section>

        <FeaturesThreeColumn
          id="features"
          eyebrow={t('f.kicker')}
          headline={t('f.title')}
          subheadline={<p>{t('f.sub')}</p>}
          features={features.map(({ icon: Icon, title, text }) => (
            <Feature key={title} icon={<Icon />} headline={t(title)} subheadline={<p>{t(text)}</p>} />
          ))}
        />

        <StatsWithGraph
          id="reliability"
          eyebrow={t('s.kicker')}
          headline={t('s.title')}
          subheadline={
            <>
              <p>{t('s.sub')}</p>
              <p className="mt-4">{t('s.plug')}</p>
            </>
          }
        >
          <Stat stat={t('s.n1')} text={t('s.d1')} />
          <Stat stat={t('s.n3')} text={t('s.d3')} />
          <Stat stat={t('s.n4')} text={t('s.d4')} />
        </StatsWithGraph>

        <PricingMultiTier
          id="download"
          eyebrow={t('d.kicker')}
          headline={t('d.title')}
          subheadline={<p>{t('d.sub')}</p>}
          plans={platforms.map((platform) => {
            const file = assets[platform.file]
            const size = assetSize(file, release?.tag_name)
            const Download = visitorOs === platform.os ? ButtonLink : SoftButtonLink
            return (
              <Plan
                key={platform.os}
                name={
                  <span className="inline-flex items-center gap-3">
                    <platform.icon className="size-6" />
                    {platform.name}
                  </span>
                }
                price={t('d.free')}
                period={size ? '· ' + size : undefined}
                badge={t(platform.badge)}
                subheadline={
                  <>
                    <p>{t(platform.req)}</p>
                    <p>{t(platform.updates)}</p>
                  </>
                }
                featuresTitle={t(platform.first)}
                features={platform.steps.map((step) => <span key={step} className={richText} dangerouslySetInnerHTML={rich(step)} />)}
                cta={
                  <div className="flex flex-col items-start gap-4">
                    <Download href={file?.browser_download_url ?? RELEASES} size="lg">{t(platform.get)}</Download>
                    {platform.os === 'linux' && (
                      <div className="flex flex-col gap-1 text-sm/6 text-mist-700 dark:text-mist-400">
                        <a href={assets.deb?.browser_download_url ?? RELEASES} className="inline-flex items-center gap-2 font-medium text-mist-950 dark:text-white">
                          {t('d.get.deb')} <ChevronIcon />
                        </a>
                        <a href="https://snapcraft.io/inkboard" className="inline-flex items-center gap-2">
                          <span className="font-medium text-mist-950 dark:text-white">{t('d.get.snap')}</span>
                          {t('d.snap.note')} <ChevronIcon className="text-mist-950 dark:text-white" />
                        </a>
                      </div>
                    )}
                  </div>
                }
              />
            )
          })}
          footer={
            <>
              <div className="flex flex-col gap-6 rounded-xl bg-mist-950/2.5 p-6 lg:flex-row lg:items-center lg:justify-between dark:bg-white/5">
                <div>
                  <h3 className="inline-flex items-center gap-3 text-2xl/8 tracking-tight text-mist-950 dark:text-white">
                    <GlobeIcon className="size-6" />
                    {t('web.title')}
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm/6 text-mist-700 sm:grid-cols-2 dark:text-mist-400">
                    {(['web.p1', 'web.p2', 'web.p3', 'web.p4'] as const).map((key) => (
                      <li key={key} className="flex gap-4">
                        <CheckmarkIcon className="h-lh shrink-0 stroke-mist-950 dark:stroke-white" />
                        <p>{t(key)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <SoftButtonLink href={webApp} size="lg" className="self-start lg:self-center">
                  {t('web.open')} <ArrowNarrowRightIcon />
                </SoftButtonLink>
              </div>
              {release && (
                <p className="mt-4 text-sm/7 text-mist-600 dark:text-mist-500">
                  <a href={release.html_url} className="font-medium text-mist-950 dark:text-white">
                    {info.latest}: {release.tag_name}
                  </a>
                  {' · '}
                  {info.released}{' '}
                  {new Date(release.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              )}
            </>
          }
        />

        <FAQsTwoColumnAccordion id="faq" headline={t('faq.title')}>
          <Faq
            id="why"
            question={t('why.q')}
            answer={
              <>
                <p>{t('why.p')}</p>
                <ul className={`list-[square] pl-6 marker:text-mist-400 dark:marker:text-mist-600 ${richText}`}>
                  <li className="pl-2" dangerouslySetInnerHTML={rich('why.1')} />
                  <li className="pl-2">{t('why.2')}</li>
                  <li className="pl-2">{t('why.3')}</li>
                </ul>
              </>
            }
          />
          <Faq
            question={t('faq.upd.q')}
            answer={platforms.map((platform) => (
              <p key={platform.os} className={richText}>
                <b>{platform.name}:</b> {t(platform.updates)}
              </p>
            ))}
          />
          <Faq question={t('faq.tab.q')} answer={<p>{t('faq.tab.a')}</p>} />
          <Faq question={t('faq.data.q')} answer={<p>{t('faq.data.a')}</p>} />
          <Faq question={t('faq.free.q')} answer={<p>{t('faq.free.a')}</p>} />
        </FAQsTwoColumnAccordion>

        <CallToActionSimple id="call-to-action" headline={t('cta.title')} subheadline={<p>{t('cta.sub')}</p>} cta={downloadButtons} />
      </Main>

      <FooterWithNewsletterFormCategoriesAndSocialIcons
        id="footer"
        cta={
          <FooterBrand
            logo={
              <a href="#top" className="inline-flex items-center gap-2">
                <img src={asset('img/icon.png')} alt="" width={36} height={36} className="size-9" />
                <span className="font-logo text-xl font-medium tracking-tight">Penrill</span>
              </a>
            }
            subheadline={<p>{t('foot.tagline')}</p>}
          />
        }
        links={
          <>
            <FooterCategory title={t('foot.product')}>
              <FooterLink href="#examples">{t('nav.examples')}</FooterLink>
              <FooterLink href="#features">{t('nav.features')}</FooterLink>
              <FooterLink href="#download">{t('nav.download')}</FooterLink>
              <FooterLink href={webApp}>{t('nav.web')}</FooterLink>
            </FooterCategory>
            <FooterCategory title={t('foot.project')}>
              <FooterLink href={GITHUB}>{t('foot.code')}</FooterLink>
              <FooterLink href={GITHUB + '/issues'}>{t('foot.issues')}</FooterLink>
              <FooterLink href={GITHUB + '/releases'}>{t('foot.releases')}</FooterLink>
            </FooterCategory>
            <FooterCategory title={t('foot.language')}>
              {(['en', 'uk'] as const).map((code) => (
                <FooterLink key={code} href={pagePath(code)} hrefLang={code} lang={code} aria-current={code === lang ? 'page' : undefined} onClick={() => rememberLanguage(code)}>
                  {pageInfo[code].language}
                </FooterLink>
              ))}
            </FooterCategory>
          </>
        }
        fineprint={<>Penrill · {t('foot.license')}</>}
        socialLinks={
          <SocialLink href={GITHUB} name="GitHub">
            <GitHubIcon />
          </SocialLink>
        }
      />
    </>
  )
}
