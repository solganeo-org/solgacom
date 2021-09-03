self.addEventListener('install', function (e) {

})

self.addEventListener('activate', function (e) {

})

self.addEventListener('push', function (e) {

  console.log(e.data.text())
  var obj = JSON.parse(e.data.text()) // this is how you parse a string into JSON

  const promise = self.registration.showNotification(obj.title, {
    body: obj.body,
    actions: [
      {
        action: obj.actionName,
        icon: obj.icon,
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
        clients.openWindow(obj.url1)
      } else {
        // Main body of notification was clicked
        clients.openWindow(obj.url2)
      }
    },
    false,
  )
})
