import { CheckOutlined } from '@ant-design/icons'
import { Alert, notification } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { locale } from '../../localization'
import { useCart } from '../../services/cart-service'
import { Form, SubmitButton, TextAreaInput, TextInput } from '../shared/form'

const validationSchema = yup.object().shape({
  shippingAddress: yup.string().required(),
  note: yup.string()
})

type CartStatus = 'idle' | 'submitted'

export const CartCheckoutForm = () => {
  const cart = useCart()
  const [cartStatus, setCartStatus] = useState<CartStatus>('idle')

  return (
    <>
      {cartStatus === 'idle' && (
        <Form
          initialValues={{ shippingAddress: '', note: '' }}
          validationSchema={validationSchema}
          onSubmit={values =>
            cart
              .checkout(values)
              .then(() => {
                setCartStatus('submitted')
              })
              .catch((err: any) => {
                notification.open({
                  type: 'error',
                  message: err?.response?.data?.message ?? 'An error occured!'
                })
              })
          }
        >
          <TextInput name="shippingAddress" label="Shipping address" />
          <TextAreaInput name="note" label="Note" />
          <div className="py-8">
            <SubmitButton type="primary" icon={<CheckOutlined />}>
              {locale.checkout}
            </SubmitButton>
          </div>
        </Form>
      )}

      {cartStatus === 'submitted' && (
        <Alert
          message="Successfully created new order"
          description={
            <>
              You can see your orders on your{' '}
              <Link to="/profile">{locale.profile.toLowerCase()}</Link>.
            </>
          }
          type="success"
          showIcon
        />
      )}
    </>
  )
}
