import React, { useState, useContext } from 'react'
import ApplicationContext from '../context/applications'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'
import { Badge } from 'primereact/badge'
import { Dialog } from 'primereact/dialog'
import { ConfirmDialog } from 'primereact/confirmdialog'

import ApplicationEdit from './ApplicationEdit'
import ProcessPhase from './ProcessPhase'

import moment from 'moment'

function ApplicationCard({ application }) {
  const [viewEditApplication, setViewEditApplication] = useState(false)
  const [viewDeleteApplication, setViewDeleteApplication] = useState(false)
  const { updateApplication, deleteApplication } = useContext(
    ApplicationContext,
  )

  function handleEdit(data) {
    setViewEditApplication(false)
    updateApplication(application, data)
  }
  function handleDelete() {
    deleteApplication(application)
  }

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Edit"
        icon="pi pi-pencil"
        onClick={() => setViewEditApplication(true)}
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => setViewDeleteApplication(true)}
      />
    </div>
  )

  return (
    <Card
      title={application.position}
      subTitle={application.company}
      footer={footer}
      className="md:w-25rem"
    >
      <strong>{application.country}</strong>
      <p className="m-0 mt-2">{application.description}</p>
      <div className="application-card-data">
        <p>{moment(application.dateApplied).format('LLLL')}</p>
        <div className="flex flex-wrap justify-content-space-evenly mb-2">
          {application.reqSkills.map((skill) => (
            <Chip label={skill} />
          ))}
        </div>
        {application.reqExperience && (
          <p>{application.reqExperience} years of experience</p>
        )}
        {application.salary && (
          <p>
            <Badge value="$" className="mr-2" />
            {application.salary}
          </p>
        )}
        <div className="flex flex-wrap justify-content-space-evenly mb-2">
          {application.labels.map((label) => (
            <Chip label={label} />
          ))}
        </div>
        {application.visa && <Badge value="Visa Support" severity="success" />}
        {application.relocation && (
          <Badge value="Relocation Support" severity="success" />
        )}
        {application.link && (
          <p>
            <a target="_blank" rel="noreferrer" href={application.link}>
              <i className="pi pi-link" /> Link{' '}
            </a>
          </p>
        )}
        <ProcessPhase phase={application.processPhase} />
      </div>
      <Dialog
        header="Edit Application"
        visible={viewEditApplication}
        className="login-dialog"
        onHide={() => setViewEditApplication(false)}
      >
        <ApplicationEdit application={application} onSubmit={handleEdit} />
      </Dialog>
      <ConfirmDialog
        visible={viewDeleteApplication}
        onHide={() => setViewDeleteApplication(false)}
        message="Are you sure you want to delete this application?"
        header="Delete Application"
        icon="pi pi-exclamation-triangle"
        accept={handleDelete}
      />
    </Card>
  )
}

export default ApplicationCard
