import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppBreadcrumb } from './index'

import { AppHeaderDropdown } from './header/index'
const axios = require('axios')

const AppHeader = () => {
  const contact = JSON.parse(sessionStorage.getItem('contact'))

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [application, setApplication] = useState('')
  const [sites, setSites] = useState([])

  // Find site
  function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++) if (arr[i][propName] == propValue) return arr[i]
  }

  // Handle on Change Input
  const handleChange = (event) => {
    setApplication(event.target.value)
    let currentSite = findElement(sites, 'id', event.target.value)

    sessionStorage.setItem('currentSite', JSON.stringify(currentSite))

    window.location.reload()
  }

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

  useEffect(() => {
    if (sessionStorage.getItem('currentSite')) {
      if (
        sessionStorage.getItem('currentSite') == 'undefined' ||
        sessionStorage.getItem('currentSite') == null
      ) {
        setApplication('')
      } else {
        setApplication(JSON.parse(sessionStorage.getItem('currentSite')).id)
      }
    }

    // Read all SItes visibles from this account
    axios
      .get(process.env.REACT_APP_ENDPOINT + '/api/sites-customers/customer-id/' + contact.id)
      .then((resp) => {
        resp.data.forEach((site) => handleAddNewSite(site))
      })
  }, []) // <-- empty dependency array

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem className="mx-3">
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem className="mx-3">
            <FormControl>
              <InputLabel id="demo-customized-select-label">Site</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={application}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {sites.map(function (name, index) {
                  return (
                    <MenuItem key={index} value={name.id}>
                      {name.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon name="cil-bell" size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon name="cil-list" size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon name="cil-envelope-open" size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
