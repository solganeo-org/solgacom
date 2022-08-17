/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ValidateForm from '../../../js/ValidateForm'
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

const CreateContact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [functionName, setFunctionName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertEmailMessage, setAlertEmailMessage] = useState('')
  const [id_profile, setIdProfile] = useState('')
  const [showAlertEmailMessage, setShowAlertEmailMessage] = useState(false)
  const [alertPasswordMessage, setAlertPasswordMessage] = useState('')
  const [showAlertPasswordMessage, setShowAlertPasswordMessage] = useState(false)
  const account = JSON.parse(sessionStorage.getItem('account'))
  const [profiles, setProfile] = useState([])

  let history = useHistory()

  // Register Action

  useEffect((index) => {
    // Read all Sites visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/profiles/account-id/' + account.id)
      .then((resp) => {
        resp.data.forEach((profile) => {
          handleAddNewProfile(profile)
          console.log(id_profile)
        })
      })
  }, []) // <-- empty dependency array

  const handleAddNewProfile = (profile) => {
    setProfile((profiles) => [
      ...profiles,
      {
        id: profile.id,
        name: profile.name,
        id_account: profile.id_account,
        read_site: profile.read_site,
        create_contact: profile.create_contact,
        modify_contact: profile.modify_contact,
        delete_contact: profile.delete_contact,
        active: profile.active,
      },
    ])
  }

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
        .post(process.env.REACT_APP_ENDPOINT + '/api/contacts', {
          first_name: firstName,
          last_name: lastName,
          username: email,
          password: password,
          email: email,
          fonction: functionName,
          icon_path: '',
          id_account: account.id,
          id_profile: id_profile,
          last_modification: dateFormat(new Date(), 'isoDateTime'),
          active: 1,
        })
        .then(function (response) {
          if (response.status == 200) {
            history.push('/dashboard/contact/manage')
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
                <CForm onSubmit={(e) => handleSubmit(e)}>
                  <h1 className="display-5 text-center">Create Contact</h1>
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
                    <CFormControl
                      placeholder="Function"
                      autoComplete="function"
                      onChange={(e) => setFunctionName(e.target.value)}
                      required
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
                      boxShadow={0}
                      onChange={(e) => setIdProfile(e.target.value)}
                    >
                      <option>Profiles</option>
                      {profiles.map(function (profile) {
                        return (
                          <option value={profile.id} key={profile.id}>
                            {profile.name}
                          </option>
                        )
                      })}
                    </CFormSelect>
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
                      minLength="8"
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
                    />
                  </CInputGroup>
                  {showAlertPasswordMessage ? (
                    <CAlert color="warning">{alertPasswordMessage}</CAlert>
                  ) : null}

                  <div className="text-center">
                    <CButton type="submit" color="primary">
                      Create Contact
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

export default CreateContact
