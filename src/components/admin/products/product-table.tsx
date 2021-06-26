import React from 'react'
import { ProductPageDto } from '../../../types/dto'
import { formatDate } from '../../../utils'
import { SimpleTable, SimpleTableProps } from '../../shared/simple-table'

export const ProductTable = (props: SimpleTableProps<ProductPageDto>) => {
  return (
    <SimpleTable
      {...props}
      columns={[
        {
          name: 'id',
          title: 'ID',
          sorter: true
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
        },
        {
          name: 'price',
          title: 'Price',
          sorter: true
        },
        {
          name: 'createdAt',
          title: 'Created At',
          sorter: true,
          defaultSortOrder: 'descend',
          render: formatDate
        }
      ]}
    />
  )
}
