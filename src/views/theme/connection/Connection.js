import React, { useEffect, useState, createRef } from 'react'

import { CListGroup, CListGroupItem, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'

const Connection = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Generate Keys</CCardHeader>
        <CCardBody>
          <CListGroup flush>
            <CListGroupItem>
              Private Key: f_JVggiwyJ2RIc4ZKMxUdFjMlL9oOBpMZ-Ky47B2YCQ
            </CListGroupItem>
            <CListGroupItem>
              Public Key:
              BPZEzUoI317hU8kuXV94CPIoMNoHdYqEc_0QZgFaSEVtGgnY3NCzPEVn3-VBRi9tMobHZBXCs1hnOWv1rXPysG4
            </CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Connection
