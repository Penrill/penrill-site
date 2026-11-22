// Retires the service worker the web app registered here when it lived at penrill.com/app/.
// Browsers check this file for updates: this version removes itself and its cache, then reloads
// open tabs, which /app/index.html sends on to app.penrill.com.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await caches.delete('penrill-app')
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      for (const client of clients) client.navigate(client.url)
    })()
  )
})
