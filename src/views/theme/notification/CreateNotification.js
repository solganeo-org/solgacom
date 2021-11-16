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
  const [urlButton, seturlButton] = useState('')
  const [urlRed, setUrlRed] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [customer, setCustomer] = useState([])
  const contact = JSON.parse(sessionStorage.getItem('contact'))
  const site = JSON.parse(sessionStorage.getItem('currentSite'))
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
        .get(process.env.REACT_APP_ENDPOINT + '/api/sites-customers/site-id/' + idSite)
        .then((resp) => {
          if (resp.status == 200) {
            console.log(contact.id)
            console.log('id site is ' + site.id)
            let clientsResponse = resp.data
            setCustomer(clientsResponse)
          }
        })
    }
  }, [])

  // On click button Send
  const createNotification = (e) => {
    console.log('id site is ' + site.id)
    e.preventDefault()
    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/notification', {
        title: title,
        content: content,
        id_contact: contact.id,
        id_site: site.id,
        urlImage: urlImage,
        urlButton: urlButton,
        urlRed: urlRed,
        status: 'Draft',
        active: 1,
      })
      .then(function (response) {
        if (response.status === 200) {
          window.location.reload()
        }
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
              <CForm onSubmit={createNotification}>
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
                <CInputGroup className="mb-3">
                  <CFormControl
                    type="text"
                    placeholder="URL Image"
                    autoComplete="URL Image"
                    onChange={(e) => setUrlImage(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormControl
                    type="text"
                    placeholder="URL Button"
                    autoComplete="URL Button"
                    onChange={(e) => seturlButton(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CFormControl
                    type="text"
                    placeholder="URL Reddirection"
                    autoComplete="URL Redirection"
                    onChange={(e) => setUrlRed(e.target.value)}
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs="6">
                    <CButton type="submit" color="success" className="px-4">
                      Create
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
