import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoSolganeo from '../../../assets/icons/favicon_png.png'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {
  let history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('contact')) {
      sessionStorage.removeItem('contact')
      sessionStorage.removeItem('account')
      sessionStorage.removeItem('currentSite')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()

    axios.get(process.env.REACT_APP_ENDPOINT + '/api/contact/email/' + email).then((resp) => {
      if (resp.data[0] == null) {
        alert('Invalid Email or Password')
      } else {
        let contact = resp.data[0]
        let passwordResponse = contact.password

        if (passwordResponse === password) {
          sessionStorage.setItem('contact', JSON.stringify(contact))

          axios
            .get(process.env.REACT_APP_ENDPOINT + '/api/contacts/email/' + contact.username)
            .then((resp) => {
              let contact = resp.data[0]
              sessionStorage.setItem('contact', JSON.stringify(contact))

              axios
                .get(process.env.REACT_APP_ENDPOINT + '/api/accounts/id/' + contact.id_account)
                .then((resp) => {
                  let account = resp.data[0]
                  sessionStorage.setItem('account', JSON.stringify(account))

                  axios
                    .get(process.env.REACT_APP_ENDPOINT + '/api/profiles/id/' + account.profile_id)
                    .then((resp) => {
                      let profile = resp.data[0]
                      sessionStorage.setItem('profile', JSON.stringify(profile))
                      history.push('/dashboard')
                    })
                })
            })
        } else {
          alert('Invalid Email or Password')
        }
      }
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => handleLogin(e)}>
                    <CRow>
                      <CCol>
                        <img src={logoSolganeo} height={35} />
                      </CCol>
                      <CCol>
                        <h1>Login</h1>
                      </CCol>
                      <CCol></CCol>
                    </CRow>
                    <p className="text-medium-emphasis">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Join us in order to send notification to your clients at any time.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
