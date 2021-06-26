import { SaveOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import React from 'react'
import * as yup from 'yup'
import { useCustomer } from '../../services/customer-service'
import { UserDto } from '../../types/dto'
import { Form, TextInput, SubmitButton } from '../shared/form'

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

export const CustomerUpdateForm = () => {
  const [customer, { update }] = useCustomer()
  const customerDetails = customer?.user as UserDto
  return (
    <Form
      initialValues={customerDetails}
      validationSchema={validationSchema}
      onSubmit={values =>
        update(values)
          .then(() => {
            notification.open({
              type: 'success',
              message: 'Successfully updated!'
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
      <TextInput label="First name" name="firstName" />
      <TextInput label="Last name" name="lastName" />

      <div className="py-8">
        <SubmitButton type="primary" icon={<SaveOutlined />}>
          Update
        </SubmitButton>
      </div>
    </Form>
  )
}
