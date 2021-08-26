import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

import { CListGroup, CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react'

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  const [contact, setContact] = useState(JSON.parse(sessionStorage.getItem('contact')))
  const [account, setAccount] = useState(JSON.parse(sessionStorage.getItem('account')))

  return (
    <>
      <CCard className="mb-4"></CCard>
      <CCardHeader> Profile Information </CCardHeader>
      <CCardBody>
        <Card className="my-3">
          <CardContent>
            <CRow className="mb-2">
              <Typography variant="h4">Account Information</Typography>
            </CRow>
            <CRow className="mb-1">
              <CCol>Society: </CCol>
              <CCol>{account.society_name} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Country: </CCol>
              <CCol>{account.country} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Phone Number: </CCol>
              <CCol>{account.phone_number} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Email: </CCol>
              <CCol>{account.email} </CCol>
            </CRow>
          </CardContent>
        </Card>

        <Card className="my-3">
          <CardContent>
            <CRow className="mb-2 font-weight-bold">
              <Typography variant="h4">Personal Information</Typography>
            </CRow>
            <CRow className="mb-1">
              <CCol>First Name: </CCol>
              <CCol>{contact.first_name} </CCol>
              <CCol>Last Name: </CCol>
              <CCol>{contact.last_name} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Email: </CCol>
              <CCol>{contact.email} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Function: </CCol>
              <CCol>{contact.fonction} </CCol>
            </CRow>
            <CRow className="mb-1">
              <CCol>Last Modification: </CCol>
              <CCol>{contact.last_modification} </CCol>
            </CRow>

            <CRow className="mb-1">
              <CCol>Password: </CCol>
              <CCol>{user.password} </CCol>
            </CRow>
          </CardContent>
        </Card>
      </CCardBody>
      <CListGroup flush></CListGroup>
    </>
  )
}

export default Profile
