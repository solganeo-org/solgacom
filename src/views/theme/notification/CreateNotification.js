import React, { useEffect, useState } from 'react'

import {
  CListGroup,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CForm,
  CRow,
  CCol,
  CInputGroup,
  CFormControl,
} from '@coreui/react'
import AmazonS3Connection from 'src/js/amazonS3'

const axios = require('axios')

const Notification = () => {
  // Variables
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clients, setClients] = useState([])
  const currentSite =
    sessionStorage.getItem('currentSite') != null &&
    sessionStorage.getItem('currentSite') !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('currentSite'))
      : undefined

  // Execute on Render
  useEffect(() => {
    if (currentSite != undefined) {
      let idSite = currentSite.id
      // Read all clients linked to the current application
      axios
        .get(process.env.REACT_APP_ENDPOINT + '/api/sites-clients/client-id/' + idSite)
        .then((resp) => {
          if (resp.status == 200) {
            let clientsResponse = resp.data
            setClients(clientsResponse)
          }
        })
    }
  }, [])

  // On click button Send
  const sendNotification = (e) => {
    e.preventDefault()

    let lastClient = clients[clients.length - 1]
    console.log(lastClient.endpoint)

    const vapidDetails = {
      mailto: 'mailto:r.zuniga@solganeo.com',
      publicKey: currentSite.public_key,
      privateKey: currentSite.private_key,
    }
    let pushSubscription = {
      endpoint: lastClient.endpoint,
      keys: {
        p256dh: lastClient.key_p256dh,
        auth: lastClient.key_auth,
      },
    }
    const payload = JSON.stringify({
      title: title,
      body: content,
      icon: 'https://drive.google.com/file/d/1HPH-xIeDWhUB9O2-Fc6anfPU-QdeYPJk/view?usp=sharing',
      url1: 'http://google.com/',
      url2: 'https://www.yahoo.com/',
      actionName: 'archive',
      actiontitle: 'LOL',
    })

    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/send-notification', {
        payload: payload,
        vapidDetails: vapidDetails,
        pushSubscription: pushSubscription,
      })
      .then((resp) => {
        console.log(resp.data)
      })
  }

  // Render if any application is selected
  if (currentSite != undefined) {
    return (
      <>
        <CCard>
          <CCardHeader>Create Notification</CCardHeader>
          <CCardBody>
            <CListGroup flush>
              <CForm onSubmit={sendNotification}>
                <CInputGroup className="mb-3">
                  <CFormControl
                    type="text"
                    placeholder="Title"
                    autoComplete="TItle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormControl
                    type="text"
                    placeholder="Content"
                    autoComplete="Content"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs="6">
                    <CButton type="submit" color="success" className="px-4">
                      Send
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CListGroup>
          </CCardBody>
        </CCard>
      </>
    )
  } else {
    return (
      <>
        <CCardHeader>Please Select an Application on the Header</CCardHeader>
      </>
    )
  }
}

export default Notification
