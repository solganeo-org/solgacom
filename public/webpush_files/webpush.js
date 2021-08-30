let idSite = 1

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function fetchAPI(endpointURL, body) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

function registerServiceWorker(callwebService) {
  navigator.serviceWorker.register('./sw.js', { scope: './' })
  navigator.serviceWorker.ready.then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          'BK5Mu0VuMAla_vyX6DTQwfO3MsA7pU1zFVm1jHR9RjL_VpzNEZhmVfHQu4JUDiq2P9TRQ7TzdCOZue-SF4ms7Yg',
        ),
      })
      .then(function (pushSubscription) {
        let subscriptionObject = JSON.parse(JSON.stringify(pushSubscription))
        console.log(subscriptionObject)

        console.log(callwebService)

        if (callwebService) {
          ;(async () => {
            fetchAPI('http://localhost:5000/api/clients', {
              endpoint: subscriptionObject.endpoint,
              key_auth: subscriptionObject.keys.auth,
              key_p256dh: subscriptionObject.keys.p256dh,
              device: 'PC',
              active: 1,
            }).then((resp) => {
              if (resp.error == false) {
                let idClient = resp.data

                fetchAPI('http://localhost:5000/api/sites-clients', {
                  id_site: idSite,
                  id_client: idClient,
                  active: 1,
                }).then((resp) => {
                  console.log(resp)
                })
              }
            })
          })()
        }
      })
  })
}

var Notification = window.Notification || window.mozNotification || window.webkitNotification

let callwebService = false

if (Notification.permission == 'default') {
  callwebService = true
}

Notification.requestPermission(function (permission) {
  if ('permissions' in navigator) {
    if (permission == 'granted') registerServiceWorker(callwebService)

    navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
      notificationPerm.onchange = function () {
        if (notificationPerm.state == 'granted') registerServiceWorker(callwebService)
      }
    })
  }
})
