import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'

import Code from '../../modals/Code.js'

const axios = require('axios')

const ManageProfile = () => {
  const account = JSON.parse(sessionStorage.getItem('account'))
  const [profiles, setProfiles] = useState([])
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const handleAddNewSite = (profile) => {
    setProfiles((profiles) => [
      ...profiles,
      {
        id: profile.id,
        name: profile.name,
        delete_contact: profile.deleteContact,
        create_contact: profile.createContact,
        modify_contact: profile.modifyContact,
        id_account: profile.id,
        active: profile.active,
      },
    ])
  }

  useEffect(() => {
    // Read all Sites visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/profiles/account-id/' + account.id)
      .then((resp) => {
        resp.data.forEach((profile) => {
          console.log(account.id)
          handleAddNewSite(profile)
        })
      })
  }, []) // <-- empty dependency array

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <Typography gutterBottom variant="h6" component="h2">
            Manage Sites
          </Typography>
        </CCardHeader>
        <CCardBody>
          {profiles.map(function (profile, index) {
            return (
              <Card boxShadow={0} key={index} className="my-2">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {profile.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {profile.url}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {profile.domain}
                  </Typography>
                  <Typography color="textSecondary">{profile.icon_path}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            )
          })}
        </CCardBody>
      </CCard>
    </>
  )
}

export default ManageProfile
