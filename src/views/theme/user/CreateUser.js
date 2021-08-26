import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'

import {
  CInputGroupText,
  CCard,
  CInputGroup,
  CCardBody,
  CButton,
  CForm,
  CRow,
  CCol,
  CFormControl,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const CreateUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [societyName, setSocietyName] = useState('')
  const [siret, setSiret] = useState('')
  const [functionName, setFunctionName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [employeesNumber, setEmployeesNumber] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <>
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4 my-5">
            <CCardBody className="p-4">
              <CForm>
                <Typography variant="h4" className="text-center">
                  Create User
                </Typography>

                <Typography variant="subtitle2" className="text-center">
                  Users created in this section will linked to the same Company
                </Typography>

                <hr></hr>
                <CRow className="mb-3">
                  <CCol>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>

                      <CFormControl
                        placeholder="First Name"
                        autoComplete="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                      ></CFormControl>
                    </CInputGroup>
                  </CCol>
                  <CCol>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>

                      <CFormControl
                        placeholder="Last Name"
                        autoComplete="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                      ></CFormControl>
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormControl
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>

                  <CFormControl
                    placeholder="Phone Number"
                    autoComplete="phonenumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></CFormControl>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>

                  <CFormControl
                    placeholder="Function"
                    autoComplete="function"
                    onChange={(e) => setFunctionName(e.target.value)}
                  ></CFormControl>
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormControl
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormControl
                    type="password"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </CInputGroup>
                <div className="text-center">
                  <CButton type="submit" color="success">
                    Create Account
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateUser
