import type { SiteLanguage } from './messages'

/**
 * The privacy policy (GDPR art. 13). Keep it true to what the site does: src/analytics.ts,
 * src/ConsentBanner.tsx and the requests in siteData.ts. Update UPDATED when the text changes.
 */
export const UPDATED = '2026-11-22'
const CONTACT = 'https://github.com/Penrill/penrill/issues'
const GITHUB_PRIVACY = 'https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement'
const GOOGLE_PRIVACY = 'https://business.safety.google/privacy/'

export interface PrivacySection {
  title: string
  /** Paragraphs; may hold links and simple markup. */
  body: string[]
}

export const privacy: Record<SiteLanguage, { title: string; description: string; updated: string; back: string; sections: PrivacySection[] }> = {
  en: {
    title: 'Privacy policy',
    description: 'What the Penrill website and app do with your data: the app collects nothing; the website counts visits with Google Analytics only if you allow it.',
    updated: 'Last updated',
    back: 'Back to Penrill',
    sections: [
      {
        title: 'In short',
        body: [
          'The Penrill app and its web version collect no data: your boards stay on your computer or in your browser.',
          'This website counts visits with Google Analytics, and only if you press <b>Accept</b> in the banner. If you decline or never answer, nothing is sent to Google and no cookies are set.'
        ]
      },
      {
        title: 'Who is responsible',
        body: [`Yaroslav Yushchenko, the author of Penrill, is responsible for this website. For questions about your data, contact us via <a href="${CONTACT}">GitHub</a>.`]
      },
      {
        title: 'Google Analytics',
        body: [
          'With your consent (GDPR art. 6(1)(a)), Google Analytics 4 records which pages you open, when, the page you came from, your browser, device type, screen size, language and an approximate location (country and city) derived from your IP address. Google Analytics does not store IP addresses.',
          'It sets two cookies, <code>_ga</code> and <code>_ga_…</code>, which tell repeat visits apart and last up to two years. Advertising features and Google signals are turned off, so the data is not used for ads or linked to a Google account.',
          `Google Ireland Limited processes this data for us. It may be transferred to Google LLC in the United States under the EU-US Data Privacy Framework. See <a href="${GOOGLE_PRIVACY}">how Google uses data</a>.`,
          'You can withdraw your consent at any time with <b>Cookie settings</b> at the bottom of the page: we then stop measuring and delete the cookies. If your browser sends Global Privacy Control, we treat it as a refusal and do not ask.'
        ]
      },
      {
        title: 'Other things the page does',
        body: [
          `The site is hosted on GitHub Pages. GitHub receives your IP address with every request and may log it for security; see the <a href="${GITHUB_PRIVACY}">GitHub privacy statement</a>.`,
          'To show the latest version on the download buttons, your browser asks the GitHub API (api.github.com) for it. The fonts are served from this site, not from Google Fonts.',
          'Your language choice and your answer in the banner are kept in your browser’s local storage and never leave it.'
        ]
      },
      {
        title: 'Your rights',
        body: [
          'You have the right to access, correct and delete your data, to restrict or object to its processing, to data portability, to withdraw consent, and to complain to a data protection authority.',
          'Google Analytics data is not linked to your name, so we usually cannot find the records of a particular person. Deleting the cookies or declining in <b>Cookie settings</b> starts you over as a new, unmeasured visitor.'
        ]
      }
    ]
  },
  uk: {
    title: 'Політика конфіденційності',
    description: 'Що сайт і програма Penrill роблять з вашими даними: програма нічого не збирає, а сайт рахує відвідування через Google Analytics лише з вашого дозволу.',
    updated: 'Оновлено',
    back: 'Назад до Penrill',
    sections: [
      {
        title: 'Коротко',
        body: [
          'Програма Penrill і її веб-версія не збирають жодних даних: ваші дошки лишаються на вашому комп’ютері або у вашому браузері.',
          'Цей сайт рахує відвідування через Google Analytics, і лише якщо ви натиснете <b>Прийняти</b> в банері. Якщо ви відхилите або не відповісте, до Google нічого не надсилається і cookie не ставляться.'
        ]
      },
      {
        title: 'Хто відповідає',
        body: [`За цей сайт відповідає Ярослав Ющенко, автор Penrill. З питаннями про ваші дані пишіть через <a href="${CONTACT}">GitHub</a>.`]
      },
      {
        title: 'Google Analytics',
        body: [
          'З вашої згоди (ст. 6(1)(a) GDPR) Google Analytics 4 записує, які сторінки ви відкриваєте і коли, з якої сторінки прийшли, ваш браузер, тип пристрою, розмір екрана, мову і приблизне місце (країну й місто), визначене за IP-адресою. Google Analytics не зберігає IP-адреси.',
          'Він ставить два cookie, <code>_ga</code> і <code>_ga_…</code>, щоб відрізняти повторні візити; вони живуть до двох років. Рекламні функції та Google signals вимкнені, тож дані не використовуються для реклами і не пов’язуються з акаунтом Google.',
          `Ці дані для нас обробляє Google Ireland Limited. Їх можуть передавати Google LLC у США за рамкою EU-US Data Privacy Framework. Докладніше: <a href="${GOOGLE_PRIVACY}">як Google використовує дані</a>.`,
          'Згоду можна відкликати будь-коли через <b>Налаштування cookie</b> внизу сторінки: тоді ми перестаємо рахувати і видаляємо cookie. Якщо ваш браузер надсилає Global Privacy Control, ми вважаємо це відмовою і не питаємо.'
        ]
      },
      {
        title: 'Що ще робить сторінка',
        body: [
          `Сайт розміщено на GitHub Pages. GitHub отримує вашу IP-адресу з кожним запитом і може записувати її в журнали для безпеки; див. <a href="${GITHUB_PRIVACY}">політику конфіденційності GitHub</a>.`,
          'Щоб показати останню версію на кнопках завантаження, ваш браузер запитує її в GitHub API (api.github.com). Шрифти завантажуються з цього сайту, а не з Google Fonts.',
          'Вибір мови і ваша відповідь у банері зберігаються в локальному сховищі браузера і нікуди не надсилаються.'
        ]
      },
      {
        title: 'Ваші права',
        body: [
          'Ви маєте право отримати доступ до своїх даних, виправити й видалити їх, обмежити обробку чи заперечити проти неї, на перенесення даних, відкликати згоду і поскаржитися до органу із захисту даних.',
          'Дані Google Analytics не прив’язані до вашого імені, тож зазвичай ми не можемо знайти записи конкретної людини. Якщо видалити cookie або відхилити в <b>Налаштуваннях cookie</b>, ви знову станете новим відвідувачем, якого не рахують.'
        ]
      }
    ]
  }
}
