import React from 'react'
import { CategoryDto } from '../../../types/dto'
import { SimpleTable, SimpleTableProps } from '../../shared/simple-table'

export const CategoryTable = (props: SimpleTableProps<CategoryDto>) => {
  return (
    <SimpleTable
      {...props}
      columns={[
        {
          name: 'id',
          title: 'ID',
          sorter: true,
          defaultSortOrder: 'descend'
        },
        {
          name: 'name',
          title: 'Name',
          sorter: true
        },
        {
          name: 'photo',
          title: 'Photo',
          render: (_, product) => (
            <img className="table-img" alt={product.name} src={product.photo} />
          )
        }
      ]}
    />
  )
}
