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
import { PhotoInput } from '../../shared/form/photo-input'

export const productValidationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  photo: yup.string().required(),
  categoryId: yup.number().required(),
  price: yup.number().positive().required()
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
        photos: [
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg',
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg',
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg'
        ]
      }}
    >
      <TextInput name="name" label="Name" />
      <TextAreaInput name="description" label="Description" />
      <NumberInput name="price" label="Price" min={1} />
      <PhotoInput name="photo" label="Photo" />
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
      <SubmitButton />
    </Form>
  )
}
