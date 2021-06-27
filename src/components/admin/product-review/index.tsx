import React from 'react'
import { formatDate } from '../../../utils'
import Crud from '../../shared/crud'
import { emptyEntityService } from '../../shared/crud/utils'
import { SimpleTable } from '../../shared/simple-table'
import { PageContainer } from '../page-container'
import { productReviewService } from '../../../services/product-review-service'
import { Link } from 'react-router-dom'

export const ProductReviews = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-product-reviews"
        entityService={{ ...emptyEntityService, ...productReviewService }}
        messages={{ title: 'Product reviews', updateTitle: 'Order info' }}
        // initialFetchParams={{ sort: 'createdAt,desc' }}
        renderTable={props => (
          <SimpleTable
            {...props}
            columns={[
              {
                name: 'id',
                title: 'ID',
                sorter: true
              },
              {
                name: 'productId',
                title: 'Product ID',
                sorter: true,
                render: (_, review) => (
                  <Link to={`/products/${review.productId}`}>
                    {review.productId}
                  </Link>
                )
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
        )}
      />
    </PageContainer>
  )
}
