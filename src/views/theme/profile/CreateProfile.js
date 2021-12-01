import React, { useState } from 'react'

import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CInputGroup,
  CFormControl,
  CForm,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

const axios = require('axios')

const CreateProfile = () => {
  const [readSite, setReadsite] = useState(true)
  const [deleteContact, setDeleteContact] = useState(true)
  const [createContact, setCreateContact] = useState(true)
  const [modifyContact, setModifyContact] = useState(true)
  const [name, setName] = useState('')
  const account = JSON.parse(sessionStorage.getItem('account'))
  let history = useHistory()
  const [state, setState] = React.useState({
    readSite: readSite,
    createContact: createContact,
    modifyContact: modifyContact,
    deleteContact: deleteContact,
  })

  const createProfile = (e) => {
    e.preventDefault()
    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/profiles', {
        name: name,
        read_site: state.readSite,
        delete_contact: state.deleteContact,
        create_contact: state.createContact,
        modify_contact: state.modifyContact,
        id_account: account.id,
        active: '1',
      })
      .then(function (response) {
        if (response.status === 200) {
          history.push('/dashboard/profile/manage')
        }
      })
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    console.log(account)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <Typography gutterBottom variant="h6" component="h2">
            Create Profile
          </Typography>
        </CCardHeader>
        <CCardBody>
          <CForm className="text-center" onSubmit={createProfile}>
            <CInputGroup className="mb-3 text-center">
              <CFormControl
                type="text"
                placeholder="Name"
                autoComplete="TItle"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CInputGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.readSite}
                  onChange={handleChange}
                  name="readSite"
                  color="primary"
                />
              }
              label="Read Site"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.createContact}
                  onChange={handleChange}
                  name="createContact"
                  color="primary"
                />
              }
              label="Create Contact"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.modifyContact}
                  onChange={handleChange}
                  name="modifyContact"
                  color="primary"
                />
              }
              label="Modify Contact"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.deleteContact}
                  onChange={handleChange}
                  name="deleteContact"
                  color="primary"
                />
              }
              label="Delete Contact"
            />
            <CRow className="my-4">
              <CCol>
                <CButton type="submit" color="success">
                  Create Profile
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CreateProfile
