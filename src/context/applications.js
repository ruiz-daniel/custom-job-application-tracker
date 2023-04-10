import { useState, useEffect, createContext } from 'react'
import { applicationApi } from '../services/api'

const ApplicationContext = createContext()

function Provider({ children }) {
  const [applications, setApplications] = useState([])
  useEffect(() => {
    localStorage.getItem('userid') && getApplications()
  }, [])

  function getApplications() {
    applicationApi.get(localStorage.getItem('userid'), (response) =>
      setApplications(response.data),
    )
  }
  function createApplication(data) {
    data.user = localStorage.getItem('userid')
    applicationApi.create(data, (response) => {
      const updatedApplications = [...applications, response.data]
      setApplications(updatedApplications)
    })
  }
  function updateApplication(application, updatedApplication) {
    updatedApplication._id = application._id
    updatedApplication.user = application.user
    applicationApi.update(updatedApplication, (response) => {
      if (response.status === 200) {
        const updatedApplications = applications.map((application) => {
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
  function deleteApplication(application) {
    applicationApi.delete(application._id, (response) => {
      if (response.status === 200) {
        const updatedApplications = applications.filter(
          (element) => application._id !== element._id,
        )
        setApplications(updatedApplications)
      }
    })
  }

  const share = {
    applications,
    setApplications,
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
