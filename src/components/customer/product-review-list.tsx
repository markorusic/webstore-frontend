import React, { Dispatch, FC, SetStateAction } from 'react'
import {
  UserOutlined,
  StarFilled,
  StarOutlined,
  EditOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { Modal, notification, Pagination } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import dayjs from 'dayjs'
import {
  ProductReviewFetchParams,
  productReviewQueryKeys,
  productReviewService,
  useProductReviewPage
} from '../../services/product-review-service'
import { paginationAdapter } from '../../utils/pagination-adapter'
import { AsyncList } from '../shared/async-list'
import { useCustomer } from '../../services/customer-service'
import { ButtonModal } from '../shared/button-modal'
import { ProductReviewForm } from './product-review-form'
import { AsyncButton } from '../shared/async-button'
import { queryClient } from '../../config/query-clinet'

export interface ProductReviewListProps {
  params: ProductReviewFetchParams
  setParams: Dispatch<SetStateAction<ProductReviewFetchParams>>
}

export const ProductReviewList: FC<ProductReviewListProps> = ({
  params,
  setParams
}) => {
  const [customer] = useCustomer()
  const productReviewPageQuery = useProductReviewPage(params)

  return (
    <AsyncList
      data={productReviewPageQuery.data?.content}
      status={productReviewPageQuery.status}
      render={reviews => (
        <div>
          {reviews.map(review => (
            <div key={review.id} className="py-16">
              <div className="align-center space-between">
                <div>
                  <Avatar size={32} icon={<UserOutlined />} />
                  <span className="px-8">
                    {review.customer.firstName} {review.customer.lastName}
                  </span>
                </div>

                {customer?.user.id === review.customer.id ? (
                  <div>
                    <ButtonModal
                      title="Update review"
                      modalProps={{ destroyOnClose: true }}
                      buttonProps={{ icon: <EditOutlined /> }}
                    >
                      <ProductReviewForm
                        initialValues={{
                          id: review.id,
                          productId: review.productId.toString(),
                          rate: review.rate,
                          content: review.content
                        }}
                        onSubmit={productReviewService.update}
                      />
                    </ButtonModal>

                    <AsyncButton
                      className="ml-8"
                      danger
                      icon={<CloseOutlined />}
                      asyncFn={() =>
                        new Promise((resolve, reject) => {
                          Modal.confirm({
                            content:
                              'Are you sure you want to remove this review?',
                            okText: 'Confirm',
                            onCancel() {
                              resolve('')
                            },
                            async onOk() {
                              try {
                                await productReviewService.delete(review.id)
                                queryClient.refetchQueries(
                                  productReviewQueryKeys.productReviews,
                                  {
                                    active: true
                                  }
                                )
                                queryClient.refetchQueries(
                                  productReviewQueryKeys.customerRroductReviews,
                                  { active: true }
                                )
                                notification.success({
                                  message: 'Successfully deleted review!'
                                })
                                resolve('')
                              } catch (err) {
                                reject(err)
                              }
                            }
                          })
                        })
                      }
                    >
                      Delete review
                    </AsyncButton>
                  </div>
                ) : null}
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
