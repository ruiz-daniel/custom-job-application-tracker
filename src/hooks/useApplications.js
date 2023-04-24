import { useState, useEffect } from 'react'
import { applicationApi } from '../services/api'

export function useApplications() {
  const [applications, setApplications] = useState([])
  useEffect(() => {
    localStorage.getItem('userid') && getApplications()
  }, [])

  function getApplications() {
    applicationApi.get(localStorage.getItem('userid'), (response) =>
      setApplications(response.data), (error) => { error.status === 401 ? localStorage.clear() : console.log(error)}
    )
  }

  function createApplication(data, callback) {
    data.user = localStorage.getItem('userid')
    applicationApi.create(data, (response) => {
      const updatedApplications = [...applications, response.data]
      setApplications(updatedApplications)
      callback()
    })
  }
  function updateApplication(application, updatedApplication, callback) {
    updatedApplication._id = application.id
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
        callback()
      }
    })
  }
  function deleteApplication(application, callback) {
    applicationApi.delete(application._id, (response) => {
      if (response.status === 200) {
        const updatedApplications = applications.filter(
          (element) => application._id !== element._id,
        )
        setApplications(updatedApplications)
        callback()
      }
    })
  }

  const mappedApplications = applications.map( application => ({
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

  return { applications : mappedApplications, getApplications, createApplication, updateApplication, deleteApplication }
}
