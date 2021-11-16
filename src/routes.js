import React from 'react'

// examples

const Notification = React.lazy(() => import('./views/theme/notification/Notification'))
const ManageNotification = React.lazy(() => import('./views/theme/notification/ManageNotification'))
const CreateNotification = React.lazy(() => import('./views/theme/notification/CreateNotification'))

const CreateSite = React.lazy(() => import('./views/theme/site/CreateSite'))
const ManageSite = React.lazy(() => import('./views/theme/site/ManageSite'))

const Profile = React.lazy(() => import('./views/theme/settings/Profile'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const User = React.lazy(() => import('./views/theme/user/CreateUser'))
const CreateUser = React.lazy(() => import('./views/theme/user/CreateUser'))
const ManageUser = React.lazy(() => import('./views/theme/user/ManageUser'))

const Profiles = React.lazy(() => import('./views/theme/profile/CreateProfile'))
const CreateProfile = React.lazy(() => import('./views/theme/profile/CreateProfile'))
const ManageProfile = React.lazy(() => import('./views/theme/profile/ManageProfile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboard/site', exact: true, name: 'Site', component: CreateSite },
  { path: '/dashboard/site/create', exact: false, name: 'Create Site', component: CreateSite },
  { path: '/dashboard/site/manage', exact: false, name: 'Manage Site', component: ManageSite },
  { path: '/dashboard/profile', exact: true, name: 'Profile', component: Profile },

  { path: '/dashboard/notification', name: 'Notification', component: Notification, exact: true },
  {
    path: '/dashboard/notification/create',
    name: 'Create Notification',
    component: CreateNotification,
    exact: false,
  },
  {
    path: '/dashboard/notification/manage',
    exact: false,
    name: 'Manage Notification',
    component: ManageNotification,
  },
  { path: '/dashboard/user', name: 'User', component: User, exact: true },
  { path: '/dashboard/user/create', name: 'Create User', component: CreateUser, exact: true },
  { path: '/dashboard/user/manage', name: 'Manage User', component: ManageUser, exact: true },

  { path: '/dashboard/profile', name: 'Profile', component: Profiles, exact: true },
  {
    path: '/dashboard/profile/create',
    name: 'Create Profile',
    component: CreateProfile,
    exact: true,
  },
  {
    path: '/dashboard/profile/manage',
    name: 'Manage Profile',
    component: ManageProfile,
    exact: true,
  },
]

export default routes
