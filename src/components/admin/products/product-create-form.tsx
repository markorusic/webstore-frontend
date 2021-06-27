import React from 'react'
import * as yup from 'yup'
import { ProductRequestDto } from '../../../types/dto'
import { CreateFromProps } from '../../shared/crud/types'
import {
  Form,
  NumberInput,
  SubmitButton,
  TextAreaInput,
  TextInput
} from '../../shared/form'
import { PhotoInput } from '../../shared/form/photo-input'
import { requiredString } from './validation'

export const ProductCreateForm = (
  props: CreateFromProps<ProductRequestDto>
) => {
  return (
    <Form
      {...props}
      initialValues={{
        name: '',
        description: '',
        photo: '',
        price: 0,
        categoryId: 1,
        photos: [
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg',
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg',
          'https://pyxis.nymag.com/v1/imgs/310/524/bfe62024411af0a9d9cd23447121704d7a-11-spongebob-squarepants.rsquare.w1200.jpg'
        ],
      }}
      validationSchema={yup.object({
        name: requiredString,
        description: requiredString,
        photo: requiredString
      })}
    >
      <TextInput name="name" label="Name" />
      <TextAreaInput name="description" label="Description" />
      <NumberInput name="price" label="Price" min={0} />
      <PhotoInput name="photo" label="Photo" />

      <div className="py-8">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </Form>
  )
}
