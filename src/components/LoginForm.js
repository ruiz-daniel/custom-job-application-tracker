import React from 'react'
import { useForm } from 'react-hook-form'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-column form-content">
          <h5>Username</h5>
          <InputText
            className="p-mb-3"
            {...register('username', { required: true })}
          />
          {errors.username && <div className="error-message"> Username required </div>}
          <h5>Password</h5>
          <InputText
            type="password"
            className="p-mb-3"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <div className="error-message"> Password required </div>
          )}
          <Button className="upload-button mt-4" label="Login" type="submit" />
        </div>
      </form>
    </>
  )
}

export default LoginForm
