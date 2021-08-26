import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'

import Code from '../../modals/Code.js'

const axios = require('axios')

const ManageSite = () => {
  const contact = JSON.parse(sessionStorage.getItem('contact'))
  const [sites, setSites] = useState([])
  const [show, setShow] = useState(false)
  const [publicKey, setPublicKey] = useState('')
  const [idSite, setIdSite] = useState('')

  const handleShow = () => setShow(true)

  const handleAddNewSite = (site) => {
    setSites((sites) => [
      ...sites,
      {
        id: site.id,
        name: site.name,
        url: site.url,
        domain: site.domain,
        icon_path: site.icon_path,
        private_key: site.private_key,
        public_key: site.public_key,
        active: site.active,
      },
    ])
  }

  const handleSeeCode = (e) => {
    let key = e.target.parentNode.getAttribute('id')
    let id = e.target.parentNode.getAttribute('idSite')
    setPublicKey(key)
    setIdSite(id)
    handleShow()
  }

  useEffect(() => {
    // Read all SItes visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/sites-contacts/account-id/' + contact.id)
      .then((resp) => {
        resp.data.forEach((site) => handleAddNewSite(site))
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
          {sites.map(function (name, index) {
            return (
              <Card boxShadow={0} key={index} className="my-2">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {name.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {name.url}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {name.domain}
                  </Typography>
                  <Typography color="textSecondary">{name.icon_path}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    id={name.public_key}
                    idSite={name.id}
                    onClick={handleSeeCode}
                  >
                    See Code
                  </Button>
                </CardActions>
              </Card>
            )
          })}
        </CCardBody>
      </CCard>

      <Code show={show} onChange={setShow} publicKey={publicKey} idSite={idSite} />
    </>
  )
}

export default ManageSite
