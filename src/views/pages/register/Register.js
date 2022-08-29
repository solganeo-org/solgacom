/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ValidateForm from './../../../js/ValidateForm'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormSelect,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
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
  const [phoneNumber, setPhoneNumber] = useState()
  const [employeesNumber, setEmployeesNumber] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertEmailMessage, setAlertEmailMessage] = useState('')
  const [showAlertEmailMessage, setShowAlertEmailMessage] = useState(false)
  const [alertPasswordMessage, setAlertPasswordMessage] = useState('')
  const [showAlertPasswordMessage, setShowAlertPasswordMessage] = useState(false)

  let history = useHistory()

  // Register Action
  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !ValidateForm.validatePassword(password, confirmPassword) &&
      !ValidateForm.validateEmail(email)
    ) {
      setShowAlertPasswordMessage(false)
      setShowAlertEmailMessage(false)

      if (!ValidateForm.validatePassword(password, confirmPassword)) {
        setAlertPasswordMessage('Both passwords are not the same')
        setShowAlertPasswordMessage(true)
      }

      if (!ValidateForm.validateEmail(email)) {
        setAlertEmailMessage('Incorrect Format')
        setShowAlertEmailMessage(true)
      }
    } else {
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
                username: email,
                password: password,
                email: email,
                fonction: functionName,
                icon_path: '',
                id_account: dataAccount.data,
                id_profile: 1,
                last_modification: dateFormat(new Date(), 'isoDateTime'),
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
                          required
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
                          required
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
                      required
                    />
                  </CInputGroup>

                  {showAlertEmailMessage ? (
                    <CAlert color="warning">{alertEmailMessage}</CAlert>
                  ) : null}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>

                    <CFormControl
                      placeholder="Society Name"
                      autoComplete="societyname"
                      onChange={(e) => setSocietyName(e.target.value)}
                      required
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
                      required
                      minLength="14"
                      maxLength="14"
                    ></CFormControl>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-list" />
                    </CInputGroupText>

                    <CFormControl
                      placeholder="Function"
                      autoComplete="function"
                      onChange={(e) => setFunctionName(e.target.value)}
                      required
                      minLength="3"
                      maxLength="3"
                    ></CFormControl>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <PhoneInput
                      country={'fr'}
                      enableAreaCodes={false}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      containerClass="my-container-class"
                      inputClass="my-input-class"
                      inputStyle={{
                        width: '100%',
                      }}
                      minlength="8"
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>

                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => setEmployeesNumber(e.target.value)}
                      required
                    >
                      <option>Employees </option>

                      <option value="1 - 10">1 - 10</option>

                      <option value="11 - 20">11 - 20</option>

                      <option value="21 - 99">21 - 99</option>

                      <option value="100 - 499">100 - 499</option>

                      <option value="500 - 1999">500 - 1999</option>

                      <option value="2000">More than 2000</option>
                    </CFormSelect>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>

                    <CFormControl
                      placeholder="Country"
                      autoComplete="country"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      minLength="2"
                      maxLength="2"
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
                      required
                      minlength="8"
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
                      required
                      minlength="8"
                    />
                  </CInputGroup>
                  {showAlertPasswordMessage ? (
                    <CAlert color="warning">{alertPasswordMessage}</CAlert>
                  ) : null}

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
