import React from 'react'
import { CategoryDto, CategoryRequestDto } from '../../../types/dto'
import { UpdateFromProps } from '../../shared/crud/types'
import { Form, SubmitButton, TextInput } from '../../shared/form'
import { PhotoInput } from '../../shared/form/photo-input'
import { categoryValidationSchema } from './category-create-form'

export const CategoryUpdateForm = ({
  activeRecord,
  ...props
}: UpdateFromProps<CategoryRequestDto, CategoryDto>) => {
  return (
    <Form
      {...props}
      validationSchema={categoryValidationSchema}
      initialValues={{
        id: activeRecord.id,
        name: activeRecord.name,
        photo: activeRecord.photo
      }}
    >
      <TextInput name="name" label="Name" />
      <PhotoInput name="photo" label="Main photo" />
      <SubmitButton />
    </Form>
  )
}
