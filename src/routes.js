import React from 'react'

// examples

const Notification = React.lazy(() => import('./views/theme/notification/Notification'))
const ManageNotification = React.lazy(() => import('./views/theme/notification/ManageNotification'))
const CreateNotification = React.lazy(() => import('./views/theme/notification/CreateNotification'))

const CreateSite = React.lazy(() => import('./views/theme/site/CreateSite'))
const ManageSite = React.lazy(() => import('./views/theme/site/ManageSite'))

const Profile = React.lazy(() => import('./views/theme/settings/Profile'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Contact = React.lazy(() => import('./views/theme/contact/CreateContact'))
const CreateContact = React.lazy(() => import('./views/theme/contact/CreateContact'))
const ManageContact = React.lazy(() => import('./views/theme/contact/ManageContact'))

const Profiles = React.lazy(() => import('./views/theme/profile/CreateProfile'))
const CreateProfile = React.lazy(() => import('./views/theme/profile/CreateProfile'))
const ManageProfile = React.lazy(() => import('./views/theme/profile/ManageProfile'))

const Solganeo = React.lazy(() => import('./views/theme/solganeo/Solganeo'))
const Subscribe = React.lazy(() => import('./views/theme/solganeo/Solganeo'))

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
  { path: '/dashboard/contact', name: 'Contact', component: Contact, exact: true },
  {
    path: '/dashboard/contact/create',
    name: 'Create Contact',
    component: CreateContact,
    exact: true,
  },
  {
    path: '/dashboard/contact/manage',
    name: 'Manage Contact',
    component: ManageContact,
    exact: true,
  },

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
  { path: '/dashboard/solganeo', name: 'Solganeo', component: Solganeo, exact: true },
  {
    path: '/dashboard/solganeo/subscribe',
    name: 'Solganeo Subscribe',
    component: Subscribe,
    exact: true,
  },
]

export default routes
