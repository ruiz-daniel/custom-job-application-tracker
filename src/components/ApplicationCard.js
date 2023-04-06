import React from 'react'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'
import { Badge } from 'primereact/badge'

import moment from 'moment'

function ApplicationCard({ application }) {
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Edit" icon="pi pi-pencil" />
      <Button label="Delete" icon="pi pi-trash" className="p-button-danger" />
    </div>
  )

  return (
    <Card
      title={application.position}
      subTitle={application.company}
      footer={footer}
      className="md:w-25rem"
    >
      <p className="m-0">{application.description}</p>
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
        <p>{application.link}</p>
      </div>
    </Card>
  )
}

export default ApplicationCard
