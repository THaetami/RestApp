import { precacheAndRoute } from 'workbox-precaching'

// do precaching
// eslint-disable-next-line no-undef
precacheAndRoute(self.__WB_MANIFEST)

// eslint-disable-next-line no-undef
self.addEventListener('install', () => {
  console.log('Service Worker: Installed')
  // eslint-disable-next-line no-undef
  self.skipWaiting()
})

// eslint-disable-next-line no-undef
self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed')

  const dataJson = event.data.json()
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.options.body,
      icon: dataJson.options.icon,
      image: dataJson.options.image
    }
  }
  // eslint-disable-next-line no-undef
  event.waitUntil(self.registration.showNotification(notification.title, notification.options))
})
