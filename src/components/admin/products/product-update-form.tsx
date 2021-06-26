import React from 'react'
import * as yup from 'yup'
import { ProductDto, ProductRequestDto } from '../../../types/dto'
import { UpdateFromProps } from '../../shared/crud/types'
import {
  Form,
  NumberInput,
  SubmitButton,
  TextAreaInput,
  TextInput
} from '../../shared/form'
import { requiredString } from './validation'

export const ProductUpdateForm = ({
  activeRecord,
  ...props
}: UpdateFromProps<ProductRequestDto, ProductDto>) => {
  return (
    <Form
      {...props}
      initialValues={{
        id: activeRecord.id,
        name: activeRecord.name,
        description: activeRecord.description,
        photo: activeRecord.photo,
        photos: activeRecord.photos.map(photo => photo.path),
        price: activeRecord.price,
        categoryId: activeRecord.category.id
      }}
      validationSchema={yup.object({
        name: requiredString,
        description: requiredString
      })}
    >
      <TextInput name="name" label="Name" />
      <TextAreaInput name="description" label="Description" />
      <NumberInput name="price" label="Price" min={0} />
      <TextInput name="photo" label="Photo" />

      <div className="py-8">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </Form>
  )
}
