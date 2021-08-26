import React from 'react'
import PropTypes from 'prop-types'

import { CListGroup, CCol, CRow, CButton } from '@coreui/react'
import { download } from 'src/js/download'
import Modal from 'react-bootstrap/Modal'

const Code = (props) => {
  const handleClose = () => props.onChange(false)
  const handleShow = () => props.onChange(true)

  const handleDownload = (e, content, filename, type) => {
    e.preventDefault()
    download(content, filename, type)
  }
  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>Generate Code</Modal.Header>

        <Modal.Body>
          <CListGroup flush>
            <CRow className="mb-4">
              <CCol>
                <p>{'Download the Following file and insert at the root directory of your site'}</p>
              </CCol>
              <CCol>
                <CButton
                  color="success"
                  onClick={(e) =>
                    handleDownload(
                      e,
                      `let idSite = ${props.idSite}

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
                            applicationServerKey: urlB64ToUint8Array('${props.publicKey}')
                                  
                          }).then(function (pushSubscription) { 
                            
                            let subscriptionObject = JSON.parse(JSON.stringify(pushSubscription))
              
                              if(callwebService){

                                  (async () => {
                                      
                                      fetchAPI(${process.env.REACT_APP_ENDPOINT}/api/clients', {
                      
                                        endpoint: subscriptionObject.endpoint, 
                                        key_auth: subscriptionObject.keys.auth,
                                        key_p256dh: subscriptionObject.keys.p256dh,
                                        device: "PC",
                                        active: 1
                      
                                      }).then((resp) => {
                      
                                        if(resp.error == false){
                      
                                          let idClient = resp.data
                      
                                          fetchAPI('http://localhost:5000/api/sites-clients', {
                      
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
                      });`,
                      'webpush.js',
                      'js',
                    )
                  }
                >
                  Download webpush.js
                </CButton>
              </CCol>
            </CRow>
          </CListGroup>
          <CRow>
            <CCol>
              <p>
                {
                  'After that, Download the service worker js file and paste it at the root directory of your web site'
                }
              </p>
            </CCol>
            <CCol>
              <CButton
                color="success"
                onClick={(e) =>
                  handleDownload(
                    e,
                    `self.addEventListener('install', function (e) {
                  console.log('sw installation done');
              });
              
              self.addEventListener('activate', function (e) {
                  console.log('sw activatation done');
              });
              
              self.addEventListener('push', function (e) {
                console.log('Pushed');
                console.log(e.data.text());
                var obj = JSON.parse(e.data.text()); // this is how you parse a string into JSON
                console.log('@@Title'+obj.title);
                console.log('@@body: '+obj.body);
                const promise = self.registration.showNotification(obj.title, {
                    body: obj.body,
                    actions: [
                              {
                                action: obj.actionName,
                                icon : obj.icon,
                                title: obj.actiontitle
                              }
                             ],
                    icon : obj.icon,
                    requireInteraction : true
                });
                e.waitUntil(promise);
                self.addEventListener('notificationclick', function(event) {
                    console.log('@@ds');
                  event.notification.close();
                  if (event.action === 'archive') {
                    // Archive action was clicked
                    console.log('@@??');
                    clients.openWindow(obj.url1);
                  } else {
                    // Main body of notification was clicked
                    clients.openWindow(obj.url2);
                  }
                }, false);
              }); `,
                    'sw.js',
                    'js',
                  )
                }
              >
                Download sw.js
              </CButton>
            </CCol>
          </CRow>
          <br /> <br /> Finally, insert:{' '}
          <code>{`<script  src="pushMain.js"></script> `} in your header page </code>
          at the header of your website
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

Code.propTypes = {
  show: PropTypes.node.isRequired,
  publicKey: PropTypes.node.isRequired,
  idSite: PropTypes.node.isRequired,
  onChange: PropTypes.func,
}

export default Code
