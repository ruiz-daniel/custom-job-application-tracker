import React from 'react'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Chip } from 'primereact/chip'

import moment from 'moment'

function ApplicationsTable({ applications }) {
  return (
    <DataTable value={applications}>
      <Column field="position" header="Position"></Column>
      <Column field="company" header="Company"></Column>
      <Column
        header="Applied on"
        body={(rowData) => moment(rowData.dateApplied).format('LLLL')}
      ></Column>
      <Column field="description" header="Description"></Column>
      <Column
        header="Required Experience"
        body={(rowData) => `${rowData.reqExperience} years`}
      ></Column>
      <Column
        header="Required Skills"
        body={(rowData) =>
          rowData.reqSkills.map((skill) => <Chip label={skill} />)
        }
      ></Column>
      <Column
        header="Visa Support"
        body={(rowData) => (rowData.visa ? 'Yes' : 'No')}
      ></Column>
      <Column
        header="Relocation Support"
        body={(rowData) => (rowData.relocation ? 'Yes' : 'No')}
      ></Column>
      <Column field="salary" header="Salary"></Column>
      <Column field="link" header="Link"></Column>
      <Column
        header="Labels"
        body={(rowData) =>
          rowData.labels.map((label) => <Chip label={label} />)
        }
      ></Column>
    </DataTable>
  )
}

export default ApplicationsTable
