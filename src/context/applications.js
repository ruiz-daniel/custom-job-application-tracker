import { createContext, useRef } from 'react'
import { useApplications } from '../hooks/useApplications'
import { Toast } from 'primereact/toast';

const ApplicationContext = createContext()

function Provider({ children }) {

  const { applications, getApplications, createApplication, updateApplication, deleteApplication, loading  } = useApplications()
  const toast = useRef(null);

  const share = {
    applications,
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication,
    toast,
    loading
  }

  return (
    <ApplicationContext.Provider value={share}>
      <Toast ref={toast} />
      {children}
    </ApplicationContext.Provider>
  )
}

export { Provider }
export default ApplicationContext
