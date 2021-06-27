import React from 'react'
import { useState } from 'react'
import {
  ProductReviewFetchParams,
  useProductReviewPage
} from '../../../services/product-review-service'
import { ProductReviewDto } from '../../../types/dto'
import { formatDate } from '../../../utils'
import { ID } from '../../shared/crud/types'
import { tableOnChangeAdapter } from '../../shared/crud/utils'
import { SimpleTable, SimpleTableProps } from '../../shared/simple-table'

export const ProductReviewTable = ({
  productId,
  ...props
}: SimpleTableProps<ProductReviewDto> & { productId: ID }) => {
  const [params, setParams] = useState<ProductReviewFetchParams>({
    id: productId,
    page: 0,
    size: 10,
    sort: 'updatedAt,desc'
  })
  const reviewsQuery = useProductReviewPage(params)
  return (
    <SimpleTable
      {...props}
      loading={reviewsQuery.isLoading}
      dataSource={reviewsQuery.data?.content}
      onChange={tableOnChangeAdapter(newParams => {
        setParams(params => ({ ...params, ...newParams }))
      })}
      columns={[
        {
          name: 'id',
          title: 'ID',
          sorter: true
        },
        {
          name: 'customer',
          title: 'Customer',
          render: (_, review) =>
            `#${review.customer.id} ${review.customer.firstName} ${review.customer.lastName}`
        },
        {
          name: 'rate',
          title: 'Rate',
          sorter: true
        },
        {
          name: 'content',
          title: 'Content',
          width: 400
        },
        {
          name: 'updatedAt',
          title: 'Updated at',
          sorter: true,
          defaultSortOrder: 'descend',
          render: formatDate
        }
      ]}
    />
  )
}
