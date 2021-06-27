import React from 'react'
import * as yup from 'yup'
import { categoryService } from '../../../services/category-service'
import { ProductRequestDto } from '../../../types/dto'
import { CreateFromProps } from '../../shared/crud/types'
import {
  Form,
  NumberInput,
  SubmitButton,
  TextAreaInput,
  TextInput
} from '../../shared/form'
import { AutocompleteInput } from '../../shared/form/autocomplete-input'
import { GalleryInput } from '../../shared/form/gallery-input'
import { PhotoInput } from '../../shared/form/photo-input'

export const productValidationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  photo: yup.string().required(),
  categoryId: yup.number().required(),
  price: yup.number().positive().required(),
  photos: yup.array().of(yup.string()).min(3).max(5)
})

export const ProductCreateForm = (
  props: CreateFromProps<ProductRequestDto>
) => {
  return (
    <Form
      {...props}
      validationSchema={productValidationSchema}
      initialValues={{
        name: '',
        description: '',
        photo: '',
        price: undefined,
        categoryId: undefined,
        photos: []
      }}
    >
      <TextInput name="name" label="Name" />
      <AutocompleteInput
        name="categoryId"
        label="Category"
        displayProperty="name"
        valueProperty="id"
        fetchData={() =>
          categoryService
            .fetchPage({ page: 0, size: 100 })
            .then(page => page.content)
        }
      />
      <TextAreaInput name="description" label="Description" />
      <NumberInput name="price" label="Price" min={1} />
      <PhotoInput name="photo" label="Main photo" />
      <GalleryInput name="photos" label="Gallery" />
      <SubmitButton />
    </Form>
  )
}
