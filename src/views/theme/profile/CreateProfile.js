import React, { useState } from 'react'

import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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

const CreateProfile = () => {
  const [name, setName] = useState('')
  const [state, setState] = React.useState({
    readSite: true,
    modifySite: true,
    deleteSite: true,
    createContact: true,
    modifyContact: true,
    deleteContact: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleCreateProfile = (e) => {
    e.preventDefault()
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
          <CForm className="text-center" onSubmit={handleCreateProfile}>
            <CInputGroup className="mb-3 text-center">
              <CFormControl
                type="text"
                placeholder="Name"
                autoComplete="TItle"
                onChange={(e) => setName(e.target.value)}
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
                  checked={state.modifySite}
                  onChange={handleChange}
                  name="modifySite"
                  color="primary"
                />
              }
              label="Modify Site"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.deleteSite}
                  onChange={handleChange}
                  name="deleteSite"
                  color="primary"
                />
              }
              label="Delete Site"
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
