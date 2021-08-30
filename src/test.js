const webpush = require('web-push')
var argv = require('minimist')(process.argv.slice(2))

if (!argv.endpoint || !argv.p256dh || !argv.auth) {
  console.log('missing some required parameters')
  return
}

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys()

//Email Public Key, Privite Key
webpush.setVapidDetails(
  'mailto:o.bensouda@solganeo.com',
  'BH4YZ_yQDkf77ZGs361qyO24CNswEFDrd4zcTJMVTqqr1kgAC6t8eTrPMTCnZfXcOuoyuKMvRLT-XQa9E7ld_sk',
  'eh-xZQ14_AXjDpgBci1Hm3x3HQIOGCCI4mL9Aa13qcY',
)

const pushSubscription = {
  endpoint: argv.endpoint,
  keys: {
    auth: argv.auth,
    p256dh: argv.p256dh,
  },
}
const payload = JSON.stringify({
  title: 'Omar',
  body: 'test',
  icon: 'https://img.icons8.com/pastel-glyph/2x/brain--v2.png',
  url1: 'http://localhost:8888/',
  url2: 'https://www.yahoo.com/Oma',
  actionName: 'archive',
  actiontitle: 'LOL',
})
webpush.sendNotification(pushSubscription, payload)
