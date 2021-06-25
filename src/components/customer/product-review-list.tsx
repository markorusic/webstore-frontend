import React, { Dispatch, FC, SetStateAction } from 'react'
import { UserOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import dayjs from 'dayjs'
import {
  ProductReviewFetchParams,
  useProductReviewPage
} from '../../services/product-review-service'
import { paginationAdapter } from '../../utils/pagination-adapter'
import { AsyncList } from '../shared/async-list'

export interface ProductReviewListProps {
  params: ProductReviewFetchParams
  setParams: Dispatch<SetStateAction<ProductReviewFetchParams>>
}

export const ProductReviewList: FC<ProductReviewListProps> = ({
  params,
  setParams
}) => {
  const productReviewPageQuery = useProductReviewPage(params)

  return (
    <AsyncList
      data={productReviewPageQuery.data?.content}
      status={productReviewPageQuery.status}
      renderItems={reviews => (
        <div>
          {reviews.map(review => (
            <div key={review.id} className="py-16">
              <div className="align-center">
                <Avatar size={32} icon={<UserOutlined />} />
                <span className="px-8">
                  {review.customer.firstName} {review.customer.lastName}
                </span>
              </div>
              <div>
                {Array.from(new Array(10)).map((_, i) => (
                  <span key={i}>
                    {i < review.rate ? <StarFilled /> : <StarOutlined />}
                  </span>
                ))}
                <span className="px-8">
                  {dayjs(review.updatedAt).format('MMMM D, YYYY h:mm A')}
                </span>
              </div>
              <div>{review.content}</div>
            </div>
          ))}

          <Pagination
            {...paginationAdapter({
              pageSize: params.size,
              current: params.page,
              total: productReviewPageQuery.data?.totalElements,
              onChange: page =>
                setParams(params => ({
                  ...params,
                  page
                }))
            })}
          />
        </div>
      )}
    />
  )
}
