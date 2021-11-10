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
  const [urlAmazon, setUrlAmazon] = useState('')

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
        url_amazon: site.url_amazon,
      },
    ])
  }

  const handleSeeCode = (e) => {
    let url_amazon = e.target.parentNode.getAttribute('url_amazon')
    setUrlAmazon(url_amazon)
    handleShow()
  }

  useEffect(() => {
    // Read all Sites visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/sites-rules/contact-id/' + contact.id)
      .then((resp) => {
        console.log(resp)
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
          {sites.map(function (site, index) {
            return (
              <Card boxShadow={0} key={index} className="my-2">
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {site.name}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {site.url}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {site.domain}
                  </Typography>
                  <Typography color="textSecondary">{site.icon_path}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    url_amazon={site.url_amazon}
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

      <Code show={show} onChange={setShow} url_amazon={urlAmazon} />
    </>
  )
}

export default ManageSite
