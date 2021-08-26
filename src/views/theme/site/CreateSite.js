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

const axios = require('axios')
const webpush = require('web-push')

const CreateSite = () => {
  const [name, setName] = useState('')
  const [url, setURL] = useState('')
  const [domain, setDomain] = useState('')
  const contact = JSON.parse(sessionStorage.getItem('contact'))

  const createSite = (e) => {
    e.preventDefault()
    // Generate VAPID KEYS
    const vapidKeys = webpush.generateVAPIDKeys()

    // Add Site to the Database

    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/sites', {
        name: name,
        url: url,
        domain: domain,
        iconPath: '',
        private_key: vapidKeys.privateKey,
        public_key: vapidKeys.publicKey,
        active: '1',
      })
      .then(function (response) {
        if (response.status == 200) {
          // Add Contact as Creator

          console.log(response)
          let site = response.data

          axios
            .post(process.env.REACT_APP_ENDPOINT + '/api/sites-contacts', {
              id_site: site.data,
              id_contact: contact.id,
              active: 1,
            })
            .then(function (response) {
              if (response.status == 200) {
                console.log('Added')
                window.location.reload()
              }
            })
        }
      })
  }
  return (
    <>
      <CCard>
        <CCard className="mb-4"></CCard>
        <CCardHeader>Create Site</CCardHeader>
        <CCardBody>
          <CListGroup flush>
            <CForm onSubmit={createSite}>
              <CInputGroup className="mb-3">
                <CFormControl
                  type="text"
                  placeholder="Website Name"
                  autoComplete="Website Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </CInputGroup>
              <CInputGroup className="mb-4">
                <CFormControl
                  type="text"
                  placeholder="URL"
                  autoComplete="URL"
                  onChange={(e) => setURL(e.target.value)}
                />
              </CInputGroup>

              <CInputGroup className="mb-4">
                <CFormControl
                  type="text"
                  placeholder="Domain"
                  autoComplete="Domain"
                  onChange={(e) => setDomain(e.target.value)}
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
}

export default CreateSite
