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
const webpush = require('web-push')
const { v4: uuidv4 } = require('uuid')

const CreateSite = () => {
  const [name, setName] = useState('')
  const [url, setURL] = useState('')
  const [domain, setDomain] = useState('')
  const contact = JSON.parse(sessionStorage.getItem('contact'))

  const createSite = (e) => {
    e.preventDefault()
    // Generate VAPID KEYS
    const vapidKeys = webpush.generateVAPIDKeys()

    //Generate File i Amazon Bucket
    const newId = uuidv4()

    // Add Site to the Database
    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/sites', {
        name: name,
        url: url,
        domain: domain,
        iconPath: '',
        private_key: vapidKeys.privateKey,
        public_key: vapidKeys.publicKey,
        url_amazon: '',
        active: '1',
      })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data)
          let site = response.data

          let data = {
            idSite: site.data,
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey,
          }

          AmazonS3Connection.upload('webpush_' + newId + '.js', data, function (url_amazon) {
            console.log(url_amazon)
            console.log(process.env.REACT_APP_ENDPOINT + '/api/sites/' + site.data)

            axios
              .put(process.env.REACT_APP_ENDPOINT + '/api/sites/' + site.data, {
                name: name,
                url: url,
                domain: domain,
                iconPath: '',
                private_key: vapidKeys.privateKey,
                public_key: vapidKeys.publicKey,
                url_amazon: url_amazon,
                active: '1',
              })
              .then(function (response) {
                // Add Contact as Creator
                axios
                  .post(process.env.REACT_APP_ENDPOINT + '/api/sites-rules', {
                    name: 'Owner',
                    modify_site: '1',
                    create_site: '1',
                    delete_site: '1',
                    read_dashboard: '1',
                    id_contact: contact.id,
                    id_site: site.data,
                    active: 1,
                  })
                  .then(function (response) {
                    if (response.status == 200) {
                      window.location.reload()
                    }
                  })
              })
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
