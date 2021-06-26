import { CommentOutlined, SaveOutlined } from '@ant-design/icons'
import { InputNumber, notification } from 'antd'
import React, { FC } from 'react'
import * as yup from 'yup'
import { queryClient } from '../../config/query-clinet'
import { useCustomerOrders } from '../../services/order-service'
import {
  productReviewQueryKeys,
  productReviewService,
  useCustomerProductReviews
} from '../../services/product-review-service'
import { ProductReviewDto, ProductReviewRequestDto } from '../../types/dto'
import { AsyncContainer } from '../shared/async-container'
import { ButtonModal } from '../shared/button-modal'
import {
  Form,
  FormInputContainer,
  SubmitButton,
  TextAreaInput
} from '../shared/form'

const validationSchema = yup.object().shape({
  content: yup.string().min(10).max(500).required(),
  rate: yup.number().min(1).max(10).required()
})

export interface ProductReviewFormProps {
  initialValues: ProductReviewRequestDto
  onSubmit(values: ProductReviewRequestDto): Promise<ProductReviewDto>
}

export const ProductReviewForm: FC<ProductReviewFormProps> = ({
  initialValues,
  onSubmit
}) => {
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values =>
        onSubmit(values)
          .then(() => {
            queryClient.refetchQueries(productReviewQueryKeys.productReviews, {
              active: true
            })
            queryClient.refetchQueries(
              productReviewQueryKeys.customerRroductReviews,
              { active: true }
            )
            notification.open({
              type: 'success',
              message: 'Successfully submited review!'
            })
          })
          .catch((err: any) => {
            notification.open({
              type: 'error',
              message: err?.response?.data?.message ?? 'An error occured!'
            })
          })
      }
    >
      {form => (
        <>
          <FormInputContainer name="rate" label="Rate">
            <InputNumber
              min={1}
              max={10}
              value={form.values.rate}
              onChange={rate =>
                form.setValues(values => ({
                  ...values,
                  rate: parseFloat(rate.toString())
                }))
              }
            />
          </FormInputContainer>

          <TextAreaInput name="content" label="Content" />

          <div className="py-8">
            <SubmitButton type="primary" icon={<SaveOutlined />}>
              Submit
            </SubmitButton>
          </div>
        </>
      )}
    </Form>
  )
}

export interface CustomerProductReviewProps {
  productId: string
}

export const CustomerProductReview: FC<CustomerProductReviewProps> = ({
  productId
}) => {
  const customerOrdersQuery = useCustomerOrders()
  const customerProductReviews = useCustomerProductReviews()

  return (
    <AsyncContainer
      data={customerOrdersQuery.data}
      status={customerOrdersQuery.status}
      render={orders => {
        const didCustomerReviewProduct = customerProductReviews.data?.some(
          review => review.productId.toString() === productId.toString()
        )
        const didCustomerBuyProduct = orders
          .filter(order => order.status === 'Shipped')
          .flatMap(order => order.orderDetails)
          .some(
            orderDetail =>
              orderDetail.productId.toString() === productId.toString()
          )

        const canWriteReview =
          didCustomerBuyProduct && !didCustomerReviewProduct

        if (!canWriteReview) {
          return null
        }

        return (
          <div className="py-8">
            <ButtonModal
              title="Write a review"
              modalProps={{ destroyOnClose: true }}
              buttonProps={{ icon: <CommentOutlined /> }}
            >
              <ProductReviewForm
                initialValues={{ productId, rate: 5, content: '' }}
                onSubmit={productReviewService.save}
              />
            </ButtonModal>
          </div>
        )
      }}
    />
  )
}
