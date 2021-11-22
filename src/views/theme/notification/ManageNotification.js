import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'

const axios = require('axios')

const ManageNotification = () => {
  const [notifications, setNotification] = useState([])
  const [customers, setCustomers] = useState([])
  const currentSite =
    sessionStorage.getItem('currentSite') != null &&
    sessionStorage.getItem('currentSite') !== 'undefined'
      ? JSON.parse(sessionStorage.getItem('currentSite'))
      : undefined

  useEffect(() => {
    if (currentSite !== undefined) {
      let idSite = currentSite.id
      // Read all clients linked to the current application
      axios
        .get(process.env.REACT_APP_ENDPOINT + '/api/notification/site-id/' + currentSite.id)
        .then((resp) => {
          resp.data.forEach((notification) => {
            //console.log(notification)

            handleAddNewNotification(notification)
          })
        })

      axios
        .get(process.env.REACT_APP_ENDPOINT + '/api/sites-customers/customers-id/' + idSite)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(idSite)
            console.log(resp.data)
            let clientsResponse = resp.data
            setCustomers(clientsResponse)
          }
        })
    }
  }, [])

  const handleAddNewNotification = (notification) => {
    setNotification((notifications) => [
      ...notifications,
      {
        id: notification.id,
        title: notification.title,
        content: notification.content,
        urlImage: notification.urlImage,
        urlButton: notification.urlButton,
        urlRed: notification.urlRed,
        status: notification.status,
        active: notification.active,
      },
    ])
  }

  const sendNotification = (e, index) => {
    e.preventDefault()

    let lastCustomer = customers[customers.length - 1]

    const vapidDetails = {
      mailto: 'mailto:r.zuniga@solganeo.com',
      publicKey: currentSite.public_key,
      privateKey: currentSite.private_key,
    }
    let pushSubscription = {
      endpoint: lastCustomer.endpoint,
      keys: {
        p256dh: lastCustomer.key_p256dh,
        auth: lastCustomer.key_auth,
      },
    }
    const payload = JSON.stringify({
      title: notifications[index].title,
      body: notifications[index].content,
      icon: notifications[index].urlImage,
      url1: notifications[index].urlButton,
      url2: notifications[index].urlRed,
      actionName: 'archive',
      actiontitle: '',
    })

    axios
      .post(process.env.REACT_APP_ENDPOINT + '/api/send-notification', {
        payload: payload,
        vapidDetails: vapidDetails,
        pushSubscription: pushSubscription,
      })
      .then((resp) => {
        console.log(notifications[index].id)
        axios.put(
          process.env.REACT_APP_ENDPOINT + '/api/notification/update/' + notifications[index].id,
          {
            status: 'Sent',
          },
          console.log(notifications[index].id),
        )
      })
  }

  const deleteNotification = (e, index) => {
    // console.log(notifications[index].id)
    e.preventDefault()
    axios
      .delete(
        process.env.REACT_APP_ENDPOINT + '/api/notification/delete/' + notifications[index].id,
      )
      .then(function (response) {
        if (response.status === 200) {
          window.location.reload()
        }
      })
  }

  if (currentSite != undefined) {
    return (
      <>
        <CCard className="mb-4">
          <CCardHeader>
            <Typography gutterBottom variant="h6" component="h2">
              Manage Notification
            </Typography>
          </CCardHeader>
          <CCardBody>
            {notifications.map(function (notification, index) {
              return (
                <Card boxShadow={0} key={index} className="my-2">
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      {notification.title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {notification.content}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {notification.urlButton}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {notification.status}
                    </Typography>
                    <Typography color="textSecondary">{notification.urlRed}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => sendNotification(e, index)}
                    >
                      Send
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => deleteNotification(e, index)}
                    >
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
  } else {
    return (
      <>
        <CCardHeader>Please Select an Application on the Header</CCardHeader>
      </>
    )
  }
}

export default ManageNotification
