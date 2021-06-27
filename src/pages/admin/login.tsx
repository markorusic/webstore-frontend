import { LoginOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import React from 'react'
import * as yup from 'yup'
import { Form, TextInput, SubmitButton } from '../../components/shared/form'
import { locale } from '../../localization'
import { useAdmin } from '../../services/admin-service'
import { LoginRequestDto } from '../../types/dto'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const Login = () => {
  const [, { login }] = useAdmin()

  const initialValues: LoginRequestDto = {
    email: '',
    password: ''
  }

  return (
    <div className="p-16 page-content-container">
      <h1>{locale.admin.login}</h1>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values =>
          login(values)
            .then(() => {
              notification.open({
                type: 'success',
                message: 'Successfully logged in!'
              })
            })
            .catch((err: any) => {
              notification.open({
                type: 'error',
                message: err?.response?.data?.message ?? 'An error occured!'
              })
            })
        }
      >
        <TextInput label="Email" name="email" type="email" />
        <TextInput label="Password" name="password" type="password" />
        <br />
        <SubmitButton type="primary" size="large" icon={<LoginOutlined />}>
          {locale.login}
        </SubmitButton>
      </Form>
    </div>
  )
}
