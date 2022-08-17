/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'

const axios = require('axios')

const ManageProfile = () => {
  const account = JSON.parse(sessionStorage.getItem('account'))
  const [profiles, setProfiles] = useState([])

  const handleAddNewProfile = (profile) => {
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

  const deleteProfile = (e, index) => {
    // console.log(notifications[index].id)
    if (profiles[index].name === 'Admin') {
      alert('Vous ne pouvez pas supprimer le profile principale lier a ce compte')
    } else {
      e.preventDefault()
      axios
        .delete(process.env.REACT_APP_ENDPOINT + '/api/profiles/delete/' + profiles[index].id)
        .then(function (response) {
          if (response.status === 200) {
            window.location.reload()
          }
        })
    }
  }

  useEffect(() => {
    // Read all Sites visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/profiles/account-id/' + account.id)
      .then((resp) => {
        resp.data.forEach((profile) => {
          console.log(account.id)
          handleAddNewProfile(profile)
        })
      })
  }, []) // <-- empty dependency array

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <Typography gutterBottom variant="h6" component="h2">
            Manage Profile
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
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="primary" onClick={(e) => deleteProfile(e, index)}>
                    Delete
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
