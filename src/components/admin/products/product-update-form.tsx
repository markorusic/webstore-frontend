import React from 'react'
import { categoryService } from '../../../services/category-service'
import { ProductDto, ProductRequestDto } from '../../../types/dto'
import { UpdateFromProps } from '../../shared/crud/types'
import {
  Form,
  NumberInput,
  SubmitButton,
  TextAreaInput,
  TextInput
} from '../../shared/form'
import { AutocompleteInput } from '../../shared/form/autocomplete-input'
import { PhotoInput } from '../../shared/form/photo-input'
import { productValidationSchema } from './product-create-form'

export const ProductUpdateForm = ({
  activeRecord,
  ...props
}: UpdateFromProps<ProductRequestDto, ProductDto>) => {
  return (
    <Form
      {...props}
      onSubmit={console.log}
      validationSchema={productValidationSchema}
      initialValues={{
        id: activeRecord.id,
        name: activeRecord.name,
        description: activeRecord.description,
        photo: activeRecord.photo,
        photos: activeRecord.photos.map(photo => photo.path),
        price: activeRecord.price,
        categoryId: activeRecord.category.id
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
