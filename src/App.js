import React from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import './styles/main.scss'

import NavBar from './components/NavBar'
import ApplicationsTable from './components/ApplicationsTable'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className='main-section'>
        <ApplicationsTable />
      </section>
    </>
  )
}

export default App
