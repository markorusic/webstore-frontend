import { LoginOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { PageContainer } from '../components/customer/page-container'
import { Form, SubmitButton, TextInput } from '../components/shared/form'
import { useCustomer } from '../services/customer-service'
import { CustomerDto, CustomerLoginRequestDto } from '../types/dto'

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export const Login = () => {
  const [, { login }] = useCustomer()
  const history = useHistory()
  const location = useLocation<CustomerDto | undefined>()

  const initialValues: CustomerLoginRequestDto = {
    email: location.state?.email ?? '',
    password: ''
  }

  return (
    <PageContainer>
      <h1>Login</h1>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          login(values)
            .then(() => {
              actions.resetForm()
              notification.open({
                type: 'success',
                message: 'Successfully logged in!'
              })
              history.push('/profile')
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
          Login
        </SubmitButton>
      </Form>
    </PageContainer>
  )
}
