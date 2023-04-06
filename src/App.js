import React from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import './styles/main.scss'

import NavBar from './components/NavBar'
import ApplicationsTable from './components/ApplicationsTable'
import ApplicationCard from './components/ApplicationCard'

import { applicationApi } from './services/api'

function App() {
  const [applications, setApplications] = React.useState([])
  React.useEffect(() => {
    applicationApi.get('642d542000645d89554932ce', (response) =>
      setApplications(response.data),
    )
  })
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="main-section">
        <ApplicationsTable applications={applications} />
      </section>
      <section className="main-section-card">
        {applications.map((application) => 
          <ApplicationCard application={application} />
        )}
      </section>
    </>
  )
}

export default App
