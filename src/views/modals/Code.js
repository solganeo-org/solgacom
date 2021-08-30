import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'

const Code = (props) => {
  const handleClose = () => props.onChange(false)

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>Generate Code</Modal.Header>

        <Modal.Body>
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
