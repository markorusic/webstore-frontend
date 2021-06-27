import React from 'react'
import * as yup from 'yup'
import { CategoryRequestDto } from '../../../types/dto'
import { CreateFromProps } from '../../shared/crud/types'
import { Form, SubmitButton, TextInput } from '../../shared/form'
import { PhotoInput } from '../../shared/form/photo-input'

export const categoryValidationSchema = yup.object({
  name: yup.string().required(),
  photo: yup.string().required()
})

export const CategoryCreateForm = (
  props: CreateFromProps<CategoryRequestDto>
) => {
  return (
    <Form
      {...props}
      validationSchema={categoryValidationSchema}
      initialValues={{ name: '', photo: '' }}
    >
      <TextInput name="name" label="Name" />
      <PhotoInput name="photo" label="Main photo" />
      <SubmitButton />
    </Form>
  )
}
