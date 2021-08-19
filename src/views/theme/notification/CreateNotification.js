import React, { useEffect, useState, createRef } from 'react'

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
  CInputGroupText,
  CFormControl,
} from '@coreui/react'

const webPush = require('web-push')
const axios = require('axios')

const Notification = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contact, setContact] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/contacts/1').then((resp) => {
      console.log(resp.data[0])
      setContact(resp.data[0])
    })
  }, []) // <-- empty dependency array

  const sendNotification = (e) => {
    e.preventDefault()

    webPush.setVapidDetails(
      'mailto:r.zuniga@solganeo.com',
      'BPZEzUoI317hU8kuXV94CPIoMNoHdYqEc_0QZgFaSEVtGgnY3NCzPEVn3-VBRi9tMobHZBXCs1hnOWv1rXPysG4',
      'f_JVggiwyJ2RIc4ZKMxUdFjMlL9oOBpMZ-Ky47B2YCQ',
    )
    let pushSubscription = {
      endpoint:
        'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABhGjOHlhkmfsMDjSW7qf1qsM5eT1DlyWK6RZohP63ZObRw6J3VaayJA1P1hCBX0Sg3aYYyvvGGNF7xNYj-fwF46gBr9Iiw56bsUpmzX3TrP-x9w56CYaSUoxznU2Ke3AsGz3dQdrgVcEW74ur6FpwNFVQy7zb15X6cy8WONsb55kj7wls',
      keys: {
        p256dh:
          'BAeyzwR5K0bUM_yUY2MxyOl6k3sRMl2-NPyrmShfd_5CZknf17067SkB-6HstCupnWeYLxpFfi45i8Xc8dHfQvc',
        auth: 'x6LYx3IpBC2Q-kmENwtp6Q',
      },
    }
    console.log(title)
    const payload = JSON.stringify({
      title: title,
      body: content,
      icon: 'https://drive.google.com/file/d/1HPH-xIeDWhUB9O2-Fc6anfPU-QdeYPJk/view?usp=sharing',
    })

    webPush.sendNotification(pushSubscription, payload).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <CCard className="mb-4"></CCard>
      <CCardHeader>Create Notification</CCardHeader>
      <CCardBody></CCardBody>
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
    </>
  )
}

export default Notification
