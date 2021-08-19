import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CListGroup,
  CListGroupItem,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CButton,
} from '@coreui/react'
import { download } from 'src/js/download'
const webpush = require('web-push')

const Code = () => {
  const handleDownload = (e, content, filename, type) => {
    e.preventDefault()
    download(content, filename, type)
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Generate Code</CCardHeader>
        <CCardBody>
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
                      `function urlB64ToUint8Array(base64String) { 
  
  const padding = '='.repeat((4 - base64String.length % 4) % 4); 
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/'); 
  const rawData = window.atob(base64); 
  const outputArray = new Uint8Array(rawData.length); 
  
  for (let i = 0; i < rawData.length; ++i) { 
    
    outputArray[i] = rawData.charCodeAt(i);} 
    return outputArray;
  
  } 
  
  var callwebService = false; 
  var permission = Notification.permission; 
  
  if(permission === 'default' ){  
    
    callwebService = true ;} 
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      
      Notification.requestPermission().then(function (result) { 
        
        if (result === 'granted') { 
          
          navigator.serviceWorker.register('./sw.js', {scope: "./"}).then(reg => {

            reg.update();
          });
          
          navigator.serviceWorker.ready.then(function (registration) { 
            
            registration.pushManager.subscribe({  
              
              userVisibleOnly: true, 
              applicationServerKey: urlB64ToUint8Array('BPZEzUoI317hU8kuXV94CPIoMNoHdYqEc_0QZgFaSEVtGgnY3NCzPEVn3-VBRi9tMobHZBXCs1hnOWv1rXPysG4')
            
            }).then(function (pushSubscription) { 
              
              console.log(JSON.stringify(pushSubscription))
              console.log(pushSubscription.endpoint)
              if(callwebService){ } 
            
            }); 
            
          }) 
          
        } else { 
            
          console.log('Autorization denied'); } }); 
          
        } 
            
  else { 
              
    console.log('Sorry, your browser does not support ') ;
            
  }`,
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default Code
