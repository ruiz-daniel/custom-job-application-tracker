import React from 'react'

import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

import './styles/main.scss'

import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
    </>
  )
}

export default App
