import React, { useState, useContext } from 'react'
import { userApi } from './services/api'
import ApplicationContext from './context/applications'

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

function App() {
  const { applications, getApplications, createApplication } = useContext(
    ApplicationContext,
  )
  React.useEffect(() => {
    localStorage.getItem('userid') && getApplications()
  }, [])

  const [view, setView] = useState('card')
  const [viewLogin, setViewLogin] = useState(false)
  const [viewRegister, setViewRegister] = useState(false)
  const [viewCreateApplication, setViewCreateApplication] = useState(false)

  function handleCreateApplication(data) {
    setViewCreateApplication(false)
    createApplication(data)
    
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
        <ApplicationCreate onSubmit={handleCreateApplication} />
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
            <ApplicationCard
              application={application}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default App
