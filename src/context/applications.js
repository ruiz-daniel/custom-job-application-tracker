import { createContext } from 'react'
import { useApplications } from '../hooks/useApplications'

const ApplicationContext = createContext()

function Provider({ children }) {

  const { applications, getApplications, createApplication, updateApplication, deleteApplication  } = useApplications()

  const share = {
    applications,
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication
  }

  return (
    <ApplicationContext.Provider value={share}>
      {children}
    </ApplicationContext.Provider>
  )
}

export { Provider }
export default ApplicationContext
