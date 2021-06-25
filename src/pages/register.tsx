import { CheckCircleOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { PageContainer } from '../components/customer/page-container'
import { Form, SubmitButton, TextInput } from '../components/shared/form'
import { locale } from '../localization'
import { customerService } from '../services/customer-service'
import { CustomerRegisterRequestDto } from '../types/dto'

type RegisterFormValues = CustomerRegisterRequestDto & {
  confirmPassword: string
}

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const Register = () => {
  const history = useHistory()
  return (
    <PageContainer>
      <h1>{locale.register}</h1>

      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          customerService
            .register(values)
            .then(customer => {
              actions.resetForm()
              notification.open({
                type: 'success',
                message: 'Successfully registered!',
                description: 'You can now login'
              })
              history.push('/login', customer)
            })
            .catch(err => {
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
        <TextInput label="Password" name="password" type="password" />
        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
        />
        <br />
        <SubmitButton
          type="primary"
          size="large"
          icon={<CheckCircleOutlined />}
        >
          Register
        </SubmitButton>
      </Form>
    </PageContainer>
  )
}
