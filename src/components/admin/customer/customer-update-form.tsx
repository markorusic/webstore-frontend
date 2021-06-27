import React from 'react'
import * as yup from 'yup'
import { AdminCustomerRequestDto } from '.'
import { UserDto } from '../../../types/dto'
import { UpdateFromProps } from '../../shared/crud/types'
import { Form, SubmitButton, TextInput } from '../../shared/form'

const customerValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required()
})

export const CustomerUpdateForm = (
  props: UpdateFromProps<AdminCustomerRequestDto, UserDto>
) => {
  return (
    <Form
      {...props}
      validationSchema={customerValidationSchema}
      initialValues={{
        id: props.activeRecord.id as string,
        firstName: props.activeRecord.firstName,
        lastName: props.activeRecord.lastName,
        email: props.activeRecord.email
      }}
    >
      <TextInput name="firstName" label="First name" />
      <TextInput name="lastName" label="Last name" />
      <TextInput name="email" label="Email" />
      <SubmitButton />
    </Form>
  )
}
