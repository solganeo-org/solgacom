import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'
import { CButton } from '@coreui/react'

import download from './../../js/download'

const Code = (props) => {
  const handleClose = () => props.onChange(false)

  const handleDownload = () => {
    console.log('Downloading ...')
    download(
      `self.addEventListener("install",function(t){}),self.addEventListener("activate",function(t){}),self.addEventListener("push",function(t){console.log(t.data.text());var n=JSON.parse(t.data.text());const i=self.registration.showNotification(n.title,{body:n.body,actions:[{action:n.actionName,icon:n.icon,title:n.actiontitle}],icon:n.icon,requireInteraction:!0});t.waitUntil(i),self.addEventListener("notificationclick",function(t){console.log("@@ds"),t.notification.close(),"archive"===t.action?clients.openWindow(n.url1):clients.openWindow(n.url2)},!1)});`,
      'sw.js',
      'js',
    )
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>Generate Code</Modal.Header>

        <Modal.Body>
          Please Download the following file and paste it at the same directory of your header page:
          <br></br>
          <CButton type="button" onClick={handleDownload}>
            Download
          </CButton>
          <br /> <br /> Insert:
          <code>{`<script  src="${props.url_amazon}"></script> `} </code> in your header page at the
          header of your website
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

Code.propTypes = {
  show: PropTypes.node.isRequired,
  url_amazon: PropTypes.node.isRequired,
  onChange: PropTypes.func,
}

export default Code
