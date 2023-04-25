import { useState, useEffect } from 'react'
import { applicationApi } from '../services/api'

export function useApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    localStorage.getItem('userid') && getApplications()
  }, [])

  function getApplications() {
    setLoading(true)
    applicationApi.get(
      localStorage.getItem('userid'),
      (response) => {
        setApplications(response.data)
        setLoading(false)
      },
      (error) => {
        error.status === 401 ? localStorage.clear() : console.log(error)
        setLoading(false)
      },
    )
  }

  function createApplication(data, callback) {
    data.user = localStorage.getItem('userid')
    setLoading(true)
    applicationApi.create(data, (response) => {
      const updatedApplications = [...applications, response.data]
      setApplications(updatedApplications)
      setLoading(false)
      callback()
    })
  }
  function updateApplication(application, updatedApplication, callback) {
    updatedApplication._id = application.id
    updatedApplication.user = application.user
    setLoading(true)
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
        setLoading(false)
        callback()
      }
    })
  }
  function deleteApplication(application, callback) {
    setLoading(true)
    applicationApi.delete(application._id, (response) => {
      if (response.status === 200) {
        const updatedApplications = applications.filter(
          (element) => application._id !== element._id,
        )
        setApplications(updatedApplications)
        setLoading(false)
        callback()
      }
    })
  }

  const mappedApplications = applications.map((application) => ({
    id: application._id,
    position: application.position,
    description: application.description,
    company: application.company,
    country: application.country,
    reqExperience: application.reqExperience,
    reqSkills: application.reqSkills,
    processPhase: application.processPhase,
    visa: application.visa,
    relocation: application.relocation,
    salary: application.salary,
    dateApplied: application.dateApplied,
    link: application.link,
    labels: application.labels,
    user: application.user,
  }))

  return {
    applications: mappedApplications,
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication,
    loading,
  }
}
