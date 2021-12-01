import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'

import Code from '../../modals/Code.js'

const axios = require('axios')

const ManageContact = () => {
  const account = JSON.parse(sessionStorage.getItem('account'))
  const [contacts, setContacts] = useState([])
  const [show, setShow] = useState(false)
  const [profileNames, setProfileNames] = useState([])

  const handleShow = () => setShow(true)

  const handleAddNewContact = (contact, profileName) => {
    setContacts((contacts) => [
      ...contacts,
      {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        fonction: contact.fonction,
        username: contact.username,
        id_account: account.id,
        id_profile: contact.id_profile,
        active: contact.active,
        profile_name: profileName.name,
      },
    ])
  }

  const handleAddNewProfileNames = (profileName) => {
    setProfileNames((profileNames) => [
      ...profileNames,
      {
        name: profileName.name,
      },
    ])
  }

  const deleteContact = (e, index) => {
    // console.log(notifications[index].id)
    if (contacts[index].fonction === 'CEO') {
      alert('Vous ne pouvez pas supprimer le contact lier a ce compte')
    } else {
      e.preventDefault()
      axios
        .delete(process.env.REACT_APP_ENDPOINT + '/api/contacts/delete/' + contacts[index].id)
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
      .get(process.env.REACT_APP_ENDPOINT + '/api/contacts/account-id/' + account.id)
      .then((resp) => {
        resp.data.forEach((contact) => {
          axios
            .get(
              process.env.REACT_APP_ENDPOINT + '/api/profiles/idProfileName/' + contact.id_profile,
            )
            .then((resp) => {
              resp.data.forEach((profileName) => {
                handleAddNewProfileNames(profileName)
                handleAddNewContact(contact, profileName)
                if (profileName === undefined) {
                  handleAddNewContact(contact)
                }
              })
            })
        })
      })
  }, []) // <-- empty dependency array

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <Typography gutterBottom variant="h6" component="h2">
            Manage contact
          </Typography>
        </CCardHeader>
        <CCardBody>
          {contacts.map(function (contact, index) {
            // console.log(contact.profile_name)
            return (
              <Card boxShadow={0} key={index} className="my-2">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {contact.first_name} {contact.last_name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {contact.username}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {contact.fonction}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary" boxShadow={0} key={index}>
                    {contact.profile_name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="primary" onClick={(e) => deleteContact(e, index)}>
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

export default ManageContact
