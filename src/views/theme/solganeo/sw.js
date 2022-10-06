// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function (e) {
  console.log('sw installation done')
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', function (e) {
  console.log('sw activatation done')
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', function (e) {
  console.log('Omar push received')
  var obj = JSON.parse(e.data.text()) // this is how you parse a string into JSON
  console.log('@@Title' + obj.title)
  console.log('@@body: ' + obj.body)
  const promise = self.registration.showNotification(obj.title, {
    body: obj.body,
    actions: [
      {
        action: obj.actionName,
        _icon: obj.icon,
        get icon() {
          return this._icon
        },
        set icon(value) {
          this._icon = value
        },
        title: obj.actiontitle,
      },
    ],
    icon: obj.icon,
    requireInteraction: true,
  })
  e.waitUntil(promise)
  self.addEventListener(
    'notificationclick',
    function (event) {
      console.log('@@ds')
      event.notification.close()
      if (event.action === 'archive') {
        // Archive action was clicked
        console.log('@@??')
        clients.openWindow(obj.url1)
      } else {
        // Main body of notification was clicked
        clients.openWindow(obj.url2)
      }
    },
    false,
  )
})
