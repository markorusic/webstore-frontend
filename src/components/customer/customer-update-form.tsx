import { SaveOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import React from 'react'
import * as yup from 'yup'
import { queryClient } from '../../config/query-clinet'
import { customerKeys, useCustomer } from '../../services/customer-service'
import { CustomerDto } from '../../types/dto'
import { Form, TextInput, SubmitButton } from '../shared/form'

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required()
})

export const CustomerUpdateForm = () => {
  const [customer, { update }] = useCustomer()
  const customerDetails = customer?.user as CustomerDto
  return (
    <Form
      initialValues={customerDetails}
      validationSchema={validationSchema}
      onSubmit={values =>
        update(values)
          .then(() => {
            queryClient.refetchQueries([customerKeys.customerActions], {
              active: true
            })
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
      <TextInput label="Email" name="email" type="email" />

      <div className="py-8">
        <SubmitButton type="primary" icon={<SaveOutlined />}>
          Update
        </SubmitButton>
      </div>
    </Form>
  )
}
