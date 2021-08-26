import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const axios = require('axios')
const dateFormat = require('dateformat')

const Register = () => {
  // Define variables

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
  let history = useHistory()

  // Register Action
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/accounts', {
        nb_employees: employeesNumber,
        society_name: societyName,
        siret: siret,
        country: country,
        phone_number: phoneNumber,
        email: email,
        icon_path: '',
        active: 1,
      })
      .then(function (response) {
        if (response.status == 200) {
          let dataAccount = response.data

          axios
            .post(process.env.REACT_APP_ENDPOINT + '/api/contacts', {
              first_name: firstName,
              last_name: lastName,
              email: email,
              fonction: functionName,
              icon_path: '',
              id_account: dataAccount.data,
              last_modification: dateFormat(new Date(), 'isoDateTime'),
              active: 1,
            })
            .then(function (response) {
              if (response.status == 200) {
                axios
                  .post(process.env.REACT_APP_ENDPOINT + '/api/users', {
                    username: email,
                    password: password,
                    id_profile: 0,
                    active: 1,
                  })
                  .then(function (response) {
                    if (response.status == 200) {
                      history.push('/')
                    }
                  })
              }
            })
        }
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4 my-5">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1 className="display-5 text-center">Register</h1>
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
                      placeholder="Society Name"
                      autoComplete="societyname"
                      onChange={(e) => setSocietyName(e.target.value)}
                    ></CFormControl>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>

                    <CFormControl
                      placeholder="SIRET"
                      autoComplete="siret"
                      onChange={(e) => setSiret(e.target.value)}
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
                      placeholder="Employees Number"
                      autoComplete="employeesnumber"
                      onChange={(e) => setEmployeesNumber(e.target.value)}
                    ></CFormControl>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>

                    <CFormControl
                      placeholder="Country"
                      autoComplete="country"
                      onChange={(e) => setCountry(e.target.value)}
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
                    <CButton type="submit" color="primary">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
