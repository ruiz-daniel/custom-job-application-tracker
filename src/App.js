import React, { useState } from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import './styles/main.scss'

import NavBar from './components/NavBar'
import ApplicationsTable from './components/ApplicationsTable'
import ApplicationCard from './components/ApplicationCard'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ApplicationCreate from './components/ApplicationCreate'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

import { applicationApi, userApi } from './services/api'


function App() {
  const [applications, setApplications] = React.useState([])
  React.useEffect(() => {
    localStorage.getItem('userid') && getApplications()
  }, [])

  const [view, setView] = useState('card')
  const [viewLogin, setViewLogin] = useState(false)
  const [viewRegister, setViewRegister] = useState(false)
  const [viewCreateApplication, setViewCreateApplication] = useState(false)
  

  function getApplications() {
    applicationApi.get(localStorage.getItem('userid'), (response) =>
      setApplications(response.data),
    )
  }

  function login(data) {
    userApi.login(
      { username: data.username, password: data.password },
      (response) => {
        if (response.status === 200) {
          setViewLogin(false)
          getApplications()
        }
      },
    )
  }
  function logout() {
    localStorage.clear()
    window.location.reload()
  }
  function register(data) {
    userApi.register(
      {
        username: data.username,
        password: data.password,
        display_name: data.display_name,
        email: data.email,
      },
      (response) => {
        if (response.status === 200) {
          setViewRegister(false)
        }
      },
    )
  }
  function createApplication(data) {
    setViewCreateApplication(false)
    data.user = localStorage.getItem('userid')
    applicationApi.create(data, (response) => {
      const updatedApplications = [...applications, response.data]
      setApplications(updatedApplications)
    })
  }
  function editApplication(application, data) {
    data._id = application._id
    data.user = application.user
    applicationApi.update(data, (response) => {
      if (response.status === 200) {
        const updatedApplications = applications.map(application => {
          if (application._id === response.data._id) {
            return response.data
          } else {
            return application
          }
        })
        setApplications(updatedApplications)
      }
    })
  }
  return (
    <>
      <header>
        <NavBar
          onLogin={() => setViewLogin(true)}
          onLogout={logout}
          onRegister={() => setViewRegister(true)}
        />
        <Dialog
          header="Sign In"
          visible={viewLogin}
          className="login-dialog"
          onHide={() => setViewLogin(false)}
        >
          <LoginForm onSubmit={login} />
        </Dialog>
        <Dialog
          header="Sign Up"
          visible={viewRegister}
          className="login-dialog"
          onHide={() => setViewRegister(false)}
        >
          <RegisterForm onSubmit={register} />
        </Dialog>
      </header>
      <Dialog
        header="New Application"
        visible={viewCreateApplication}
        className="login-dialog"
        onHide={() => setViewCreateApplication(false)}
      >
        <ApplicationCreate onSubmit={createApplication} />
      </Dialog>
      <div className="flex flex-row-reverse px-6 pt-3">
        <Button
          className="ml-2"
          icon="pi pi-th-large"
          text
          severity="secondary"
          size="large"
          onClick={() => setView('card')}
        />
        <Button
          icon="pi pi-table"
          text
          severity="secondary"
          size="large"
          onClick={() => setView('table')}
        />
        <Button
          className="mr-4 floating-button"
          icon="pi pi-plus"
          label="New Application"
          size="small"
          onClick={() => setViewCreateApplication(true)}
        />
      </div>
      {view === 'table' && (
        <section className="main-section">
          <ApplicationsTable applications={applications} />
        </section>
      )}
      {view === 'card' && (
        <section className="main-section-card">
          {applications.map((application) => (
            <ApplicationCard application={application} onEdit={editApplication} />
          ))}
        </section>
      )}
    </>
  )
}

export default App
