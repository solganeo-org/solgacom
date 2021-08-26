import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src="/avatars/8.jpg" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon name="cil-bell" className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-envelope-open" className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-task" className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-comment-square" className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <Link to="/dashboard/profile">
          <CDropdownItem>
            <CIcon name="cil-user" className="me-2" />
            Profile
          </CDropdownItem>
        </Link>

        <CDropdownItem href="/dashboard/settings">
          <CIcon name="cil-settings" className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />
        <Link to="/">
          <CDropdownItem>
            <CIcon name="cil-lock-locked" className="me-2" />
            Log out
          </CDropdownItem>
        </Link>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
