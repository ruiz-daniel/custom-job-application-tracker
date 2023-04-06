import React, { useState } from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import './styles/main.scss'

import NavBar from './components/NavBar'
import ApplicationsTable from './components/ApplicationsTable'
import ApplicationCard from './components/ApplicationCard'
import { Button } from 'primereact/button'

import { applicationApi } from './services/api'

function App() {
  const [applications, setApplications] = React.useState([])
  React.useEffect(() => {
    applicationApi.get('642d542000645d89554932ce', (response) =>
      setApplications(response.data),
    )
  })
  const [view, setView] = useState('card')
  return (
    <>
      <header>
        <NavBar />
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
