import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ManageUser = () => {
  return (
    <>
      <CRow>
        <CCard className="mb-4">
          <CCardHeader> Manage Users </CCardHeader>
          <CCardBody>
            <CTable hover responsive align="middle" className="mb-0 border">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon name="cil-people" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                  <CTableHeaderCell>Usage</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src="/avatars/1.jpg" status="success" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>Yiorgos Avraamu</div>
                    <div className="small text-medium-emphasis">
                      <span>New</span> | Registered: Jan 1, 2015
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cif-us" title="us" id="us" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <strong>50%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">Jun 11, 2015 - Jul 10, 2015</small>
                      </div>
                    </div>
                    <CProgress thin color="success" value={50} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cib-cc-mastercard" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>10 sec ago</strong>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src="/avatars/2.jpg" status="danger" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>Avram Tarasios</div>
                    <div className="small text-medium-emphasis">
                      <span>Recurring</span> | Registered: Jan 1, 2015
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cif-br" title="br" id="br" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <strong>10%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">Jun 11, 2015 - Jul 10, 2015</small>
                      </div>
                    </div>
                    <CProgress thin color="info" value={10} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cib-cc-visa" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>5 minutes ago</strong>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src="/avatars/3.jpg" status="warning" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>Quintin Ed</div>
                    <div className="small text-medium-emphasis">
                      <span>New</span> | Registered: Jan 1, 2015
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cif-in" title="in" id="in" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="clearfix">
                      <div className="float-start">
                        <strong>74%</strong>
                      </div>
                      <div className="float-end">
                        <small className="text-medium-emphasis">Jun 11, 2015 - Jul 10, 2015</small>
                      </div>
                    </div>
                    <CProgress thin color="warning" value={74} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" name="cib-cc-stripe" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-medium-emphasis">Last login</div>
                    <strong>1 hour ago</strong>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CRow>
    </>
  )
}

export default ManageUser
