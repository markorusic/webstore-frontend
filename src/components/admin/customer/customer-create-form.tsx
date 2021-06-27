import React from 'react'
import * as yup from 'yup'
import { AdminCustomerRequestDto } from '.'
import { CreateFromProps } from '../../shared/crud/types'
import { Form, SubmitButton, TextInput } from '../../shared/form'

const customerValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required()
})

export const CustomerCreateForm = (
  props: CreateFromProps<AdminCustomerRequestDto>
) => {
  return (
    <Form
      {...props}
      validationSchema={customerValidationSchema}
      initialValues={{
        firstName: '',
        lastName: '',
        password: '',
        email: ''
      }}
    >
      <TextInput name="firstName" label="First name" />
      <TextInput name="lastName" label="Last name" />
      <TextInput name="email" label="Email" />
      <TextInput name="password" label="Password" type="password" />
      <SubmitButton />
    </Form>
  )
}
