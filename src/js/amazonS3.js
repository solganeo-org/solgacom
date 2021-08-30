const AWS = require('aws-sdk')

class AmazonS3Connection {
  static upload(filename, data, callback) {
    let code = `let idSite = ${data.idSite}

    function urlB64ToUint8Array(base64String) { 
      
      const padding = '='.repeat((4 - base64String.length % 4) % 4); 
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/'); 
      const rawData = window.atob(base64); 
      const outputArray = new Uint8Array(rawData.length); 
      
      for (let i = 0; i < rawData.length; ++i) { 
        
        outputArray[i] = rawData.charCodeAt(i);
      
      } 
        return outputArray;
      
    } 
    
    async function fetchAPI(endpointURL, body) {
    
      const response =  await fetch(endpointURL, {
    
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    
      })
    
      return response.json()
    
    }
    
    function registerServiceWorker(callwebService) {
    
      navigator.serviceWorker.register('./sw.js', {scope: "./"})
      navigator.serviceWorker.ready.then(function (registration) { 
                
        registration.pushManager.subscribe({  
                  
          userVisibleOnly: true, 
          applicationServerKey: urlB64ToUint8Array('${data.publicKey}')
                
        }).then(function (pushSubscription) { 
          
          let subscriptionObject = JSON.parse(JSON.stringify(pushSubscription))

            if(callwebService){

                (async () => {
                    
                    fetchAPI('${process.env.REACT_APP_ENDPOINT}/api/clients', {
    
                      endpoint: subscriptionObject.endpoint, 
                      key_auth: subscriptionObject.keys.auth,
                      key_p256dh: subscriptionObject.keys.p256dh,
                      device: "PC",
                      active: 1
    
                    }).then((resp) => {
    
                      if(resp.error == false){
    
                        let idClient = resp.data
    
                        fetchAPI('${process.env.REACT_APP_ENDPOINT}/api/sites-clients', {
    
                          id_site: idSite,
                          id_client: idClient,
                          active: 1
                         
                        }).then((resp) => {
    
                          console.log(resp)
    
                        })
    
                      }
    
                    });
          
                })(); 
              
            } 
                
        }); 
                
      }) 
    
    }
    
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    
    let callwebService = false;
    
    if (Notification.permission == 'default') {
      callwebService = true;
    }
    
    Notification.requestPermission(function (permission) {
    
        if ('permissions' in navigator) {
        
        if(permission == 'granted')  registerServiceWorker(callwebService);
        
        navigator.permissions.query({name:'notifications'}).then(function(notificationPerm) {
            notificationPerm.onchange = function() {
    
                if(notificationPerm.state == 'granted') registerServiceWorker(callwebService)
            };
        });
        }
    });`
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
