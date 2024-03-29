import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CContainer,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalBody,
} from '@coreui/react'

const axios = require('axios')

function Solganeo() {
  const [visibleRequestModal, setVisibleRequestModal] = useState(false)
  const [visibleResponseModal, setVisibleResponseModal] = useState(false)

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    // eslint-disable-next-line no-useless-escape
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const handleSubscribe = (e) => {
    setVisibleRequestModal(true)
  }

  const checkRemotePermission = function (permissionData) {
    if (permissionData.permission === 'default') {
      // This is a new web service URL and its validity is unknown.
      window.safari.pushNotification.requestPermission(
        'https://solganeo-api.herokuapp.com/', // The web service URL.
        'web.com.example.domain', // The Website Push ID.
        {}, // Data that you choose to send to your server to help you identify the user.
        checkRemotePermission, // The callback function.
      )
    } else if (permissionData.permission === 'denied') {
      console.log('clients said no')
    } else if (permissionData.permission === 'granted') {
      // The web service URL is a valid push provider, and the user said yes.
      // permissionData.deviceToken is now available to use.
      console.log('clients said yes')
    }
  }

  const handleClose = (e, modalName) => {
    switch (modalName) {
      case 'request':
        setVisibleRequestModal(false)
        break

      case 'response':
        setVisibleResponseModal(false)
        break

      default:
        console.log('No name')
        break
    }
  }

  const subscribe = (pushSubscriptionObject) => {
    console.log(navigator.userAgentData.brands)
    console.log(pushSubscriptionObject)

    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/subscription', pushSubscriptionObject)
      .then((response) => {
        console.log(response)

        setVisibleRequestModal(false)
        setVisibleResponseModal(true)
      })
  }

  const isTheBrowserIsSafari = () => {
    return 'safari' in window && 'pushNotification' in window.safari
  }

  const isPushNotificationSupported = () => {
    return (
      // eslint-disable-next-line prettier/prettier
      ('serviceWorker' in navigator && 'PushManager' in window) ||
      'pushNotification' in window.safari
    )
  }

  const registerServiceWorker = () => {
    return navigator.serviceWorker.register('./sw.js')
  }

  const askUserPermission = async () => {
    return await Notification.requestPermission()
  }

  const handleAcceptNotifications = (e) => {
    // 1.     Check if notifications are supported by the browser
    if (isPushNotificationSupported()) {
      // 2.     Ask the user permission
      let userPermission = askUserPermission()
      console.log(isTheBrowserIsSafari())
      var permissionN = Notification.permission
      console.log(Notification.permission)
      userPermission.then((permission = permissionN) => {
        console.log(permission)
        if (permission === 'granted') {
          console.log('Permission Granted')
          if ('serviceWorker' in navigator) {
            console.log('serviceWorkerinstalled')
            // 3.     Register a service worker
            registerServiceWorker()
              .then(function (_registration) {
                console.log('Registering ServiceWorker')
                console.log()
                navigator.serviceWorker.ready.then(function (registration) {
                  if (isTheBrowserIsSafari()) {
                    registration.pushNotification
                      .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlB64ToUint8Array(
                          'BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws',
                        ),
                      })
                      .then(function (pushSubscription) {
                        console.log(pushSubscription)
                        let pushSubscriptionObject = pushSubscription.toJSON()
                        subscribe(pushSubscriptionObject)
                      })
                  } else {
                    registration.pushManager
                      .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlB64ToUint8Array(
                          'BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws',
                        ),
                      })
                      .then(function (pushSubscription) {
                        console.log(pushSubscription)
                        let pushSubscriptionObject = pushSubscription.toJSON()
                        subscribe(pushSubscriptionObject)
                      })
                  }
                })
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        }
        console.log('no granted')
      })
    } else {
      if (isTheBrowserIsSafari() && isPushNotificationSupported()) {
        var permissionData = window.safari.pushNotification.permission('solgacom.herokuapp.com')
        checkRemotePermission(permissionData)
      } else {
        console.log('Push SUbscription Notifications are not supported by the navigator :(')
      }
    }
    //4.      (Optionally) Create a notification subscription
    //5.      (Optionally) Send the subscription to a Push Server
    //6.      Display the Push notification

    //   Notification.requestPermission().then(function (result) {
    //     if (result === 'granted') {
    //       // serviceWorker.register()
    //       navigator.serviceWorker.register('sw.js')
    //       navigator.serviceWorker.ready.then(function (registration) {
    //         registration.pushManager
    //           .subscribe({
    //             userVisibleOnly: true,
    //             applicationServerKey: urlB64ToUint8Array(
    //               'BNrknLI66MNnJC5gFrzOOuDKGeK5K3S2jzRSOHeSPqIVqwIzVwjRbNvGbfsBfXc_Yvcgxf5eMTz9P2WcgGXgEws',
    //             ),
    //           })
    //           .then(function (pushSubscription) {
    //             let pushSubscriptionObject = pushSubscription.toJSON()
    //             subscribe(pushSubscriptionObject)
    //           })
    //       })
    //     } else {
    //       console.log('Authorization Denied ! ')
    //     }
    //   })
    // }
  }

  return (
    <>
      <CCard>
        <CCardHeader>Subscribe To Solganeo Notifications</CCardHeader>
        <CCardBody>
          {' '}
          If you want to receive Solganeo notifications, please click the following button!{' '}
        </CCardBody>
        <CContainer>
          <CRow>
            <CCol className="align-self-center">
              <CButton className="m-2" onClick={handleSubscribe}>
                {' '}
                Subscribe
              </CButton>
            </CCol>
          </CRow>
        </CContainer>
      </CCard>

      {/* Request Modal */}
      <CModal visible={visibleRequestModal} onClose={() => setVisibleRequestModal(false)}>
        <CModalHeader>Solganeo</CModalHeader>
        <CModalBody>Do you want to receive Solganeo Notifications ?</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleAcceptNotifications}>
            Yes
          </CButton>{' '}
          <CButton color="secondary" onClick={(e) => handleClose(e, 'request')}>
            No
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Request Modal */}
      <CModal visible={visibleResponseModal} onClose={() => setVisibleResponseModal(false)}>
        <CModalHeader>Solganeo</CModalHeader>
        <CModalBody>Subscribed ! You can now Start Receiving Solganeo Notifications</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={(e) => handleClose(e, 'response')}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Solganeo
