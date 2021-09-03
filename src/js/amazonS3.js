const AWS = require('aws-sdk')

class AmazonS3Connection {
  static upload(filename, data, callback) {
    let code = `let idSite=${data.idSite};function urlB64ToUint8Array(e){const i=(e+"=".repeat((4-e.length%4)%4)).replace(/-/g,"+").replace(/_/g,"/"),t=window.atob(i),n=new Uint8Array(t.length);for(let e=0;e<t.length;++e)n[e]=t.charCodeAt(e);return n}async function fetchAPI(e,i){return(await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(i)})).json()}function registerServiceWorker(e){navigator.serviceWorker.register("https://solgacomdev.s3.eu-west-3.amazonaws.com/webpush_files/sw.js"),navigator.serviceWorker.ready.then(function(i){i.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:urlB64ToUint8Array("${data.publicKey}")}).then(function(i){let t=JSON.parse(JSON.stringify(i));e&&(async()=>{fetchAPI("${process.env.REACT_APP_ENDPOINT}/api/clients",{endpoint:t.endpoint,key_auth:t.keys.auth,key_p256dh:t.keys.p256dh,device:"PC",active:1}).then(e=>{if(0==e.error){let i=e.data;fetchAPI("${process.env.REACT_APP_ENDPOINT}/api/sites-clients",{id_site:idSite,id_client:i,active:1}).then(e=>{console.log(e)})}})})()})})}var Notification=window.Notification||window.mozNotification||window.webkitNotification;let callwebService=!1;"default"==Notification.permission&&(callwebService=!0),Notification.requestPermission(function(e){"permissions"in navigator&&("granted"==e&&registerServiceWorker(callwebService),navigator.permissions.query({name:"notifications"}).then(function(e){e.onchange=function(){"granted"==e.state&&registerServiceWorker(callwebService)}}))});`
    const AWSCredentials = {
      accessKey: process.env.REACT_APP_ACCESS_KEY_ID,
      secret: process.env.REACT_APP_SECRET_ACCESS_KEY,
      bucketName: process.env.REACT_APP_BUCKET,
    }

    const s3 = new AWS.S3({
      accessKeyId: AWSCredentials.accessKey,
      secretAccessKey: AWSCredentials.secret,
      region: 'eu-west-3',
    })

    // Setting up S3 upload parameters
    const params = {
      Bucket: AWSCredentials.bucketName,
      Key: 'webpush_files/' + filename,
      Body: Buffer.from(code),
    }

    s3.upload(params, function (err, data) {
      if (err) {
        throw err
      }
      callback(data.Location)
    })
  }
}

export default AmazonS3Connection
