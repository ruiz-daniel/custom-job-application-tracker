import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { Chips } from 'primereact/chips'
import { InputSwitch } from 'primereact/inputswitch'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

function ApplicationEdit({ application, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const phases = [
    'Applied',
    'First Interview',
    'Assessment',
    'HR Interview',
    'Technical Interview',
    'Final Answer',
    'Offer',
    'Hired',
  ]

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column form-content application-form">
          <h5>Position</h5>
          <InputText
            className="p-mb-3"
            defaultValue={application.position}
            {...register('position', { required: true })}
          />
          {errors.position && (
            <div className="error-message"> Position required </div>
          )}
          <h5>Company</h5>
          <InputText
            className="p-mb-3"
            defaultValue={application.company}
            {...register('company', { required: true })}
          />
          {errors.company && (
            <div className="error-message"> Company required </div>
          )}
          <h5>Description</h5>
          <InputTextarea
            defaultValue={application.description}
            rows={5}
            {...register('description')}
            autoResize
          />
          <h5>Country</h5>
          <InputText
            className="p-mb-3"
            defaultValue={application.country}
            {...register('country', { required: true })}
          />
          <h5>Required Experience (years)</h5>
          <InputText
            type="number"
            defaultValue={application.reqExperience}
            {...register('reqExperience', { min: 0 })}
          />
          <h5>Required Skills</h5>
          <Controller
            name="reqSkills"
            defaultValue={application.reqSkills}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
          <h5>Salary</h5>
          <InputText
            type="number"
            defaultValue={application.salary}
            {...register('salary', { min: 0 })}
          />
          <h5>Visa Support</h5>
          <Controller
            name="visa"
            defaultValue={application.visa}
            control={control}
            render={({ field, fieldState }) => (
              <InputSwitch
                checked={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
          <h5>Relocation Support</h5>
          <Controller
            name="relocation"
            defaultValue={application.relocation}
            control={control}
            render={({ field, fieldState }) => (
              <InputSwitch
                checked={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />

          <h5>Custom Labels</h5>
          <Controller
            name="labels"
            defaultValue={application.labels}
            control={control}
            render={({ field, fieldState }) => (
              <Chips
                allowDuplicate={false}
                separator=","
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
          <h5>Process phase</h5>
          <Controller
            name="processPhase"
            defaultValue={application.processPhase}
            control={control}
            render={({ field, fieldState }) => (
              <Dropdown
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={phases}
              />
            )}
          />
          <h5>Applied On</h5>
          <Calendar
            defaultValue={application.dateApplied}
            {...register('dateApplied')}
            showIcon
          />
          <h5>Link</h5>
          <InputText
            className="p-mb-3"
            defaultValue={application.link}
            {...register('link')}
          />
          <Button
            className="upload-button mt-4"
            label="Save"
            type="submit"
            style={{ width: '50%' }}
          />
        </div>
      </form>
    </>
  )
}

export default ApplicationEdit
