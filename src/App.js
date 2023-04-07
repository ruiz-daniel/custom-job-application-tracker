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
  // const [viewRegister, setViewRegister] = useState(false)

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
  return (
    <>
      <header>
        <NavBar onLogin={() => setViewLogin(true)} onLogout={logout} />
        <Dialog
          header="Login"
          visible={viewLogin}
          className='login-dialog'
          onHide={() => setViewLogin(false)}
        >
          <LoginForm onSubmit={login} />
        </Dialog>
      </header>

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
      </div>
      {view === 'table' && (
        <section className="main-section">
          <ApplicationsTable applications={applications} />
        </section>
      )}
      {view === 'card' && (
        <section className="main-section-card">
          {applications.map((application) => (
            <ApplicationCard application={application} />
          ))}
        </section>
      )}
    </>
  )
}

export default App
