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

  const isPushNotificationSupported = () => {
    console.log('Application is supported')
    return 'serviceWorker' in navigator && 'PushManager' in window
  }

  const registerServiceWorker = () => {
    console.log('is supported')
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

      userPermission.then((permission) => {
        console.log(permission)
        if (permission === 'granted') {
          console.log('Permission Granted')
          // 3.     Register a service worker
          registerServiceWorker()
            .then(function (registration) {
              console.log('Registering ServiceWorker')
              navigator.serviceWorker.ready.then(function (registration) {
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
              })
            })
            .catch(function (err) {
              console.log(err)
              console.log('no register')
            })
        }
      })
    } else {
      console.log('Push SUbscription Notifications are not supported by the navigator :(')
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
