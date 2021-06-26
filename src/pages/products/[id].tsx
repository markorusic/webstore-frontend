import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Image, Row } from 'antd'
import { PageContainer } from '../../components/customer/page-container'
import { AsyncContainer } from '../../components/shared/async-container'
import { useProduct } from '../../services/products-service'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { locale } from '../../localization'
import { ProductReviewList } from '../../components/customer/product-review-list'
import { ProductReviewFetchParams } from '../../services/product-review-service'
import { SimpleSelect } from '../../components/shared/simple-select'
import { useCart } from '../../services/cart-service'
import { useCustomer } from '../../services/customer-service'
import { CustomerProductReview } from '../../components/customer/product-review-form'

export const Product = () => {
  const { id } = useParams<{ id: string }>()
  const [customer] = useCustomer()
  const cart = useCart()
  const productQuery = useProduct(id)
  const [productReviewFetchParams, setProductReviewFetchParams] =
    useState<ProductReviewFetchParams>({
      id,
      page: 0,
      size: 5,
      sort: 'updatedAt,desc'
    })

  return (
    <PageContainer>
      <AsyncContainer
        data={productQuery.data}
        status={productQuery.status}
        render={product => (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12}>
                <div>
                  <Image width={400} src={product.photo} />
                </div>
                <div className="py-8">
                  <Row gutter={[4, 4]}>
                    {product.photos.slice(0, 4).map(photo => (
                      <Col key={photo.id}>
                        <Image width={100} src={photo.path} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>

              <Col xs={24} sm={12}>
                <h1>{product.name}</h1>
                <Link to={`/products?categoryId=${product.category.id}`}>
                  <h3 className="secondary-text">{product.category.name}</h3>
                </Link>
                <p className="py-16">{product.description}</p>
                <div className="py-16">
                  <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => cart.add(product.id)}
                  >
                    {locale.addToCart}
                  </Button>
                </div>
              </Col>
            </Row>

            <div className="py-16">
              <div className="space-between">
                <h2>{locale.reviews}</h2>

                <div className="px-8">
                  <SimpleSelect
                    id="review-sort-select"
                    placeholder={locale.selectSort}
                    defaultValue={productReviewFetchParams.sort}
                    onChange={value =>
                      setProductReviewFetchParams(params => ({
                        ...params,
                        sort: value as ProductReviewFetchParams['sort']
                      }))
                    }
                    items={[
                      { title: 'Most recent', value: 'updatedAt,desc' },
                      { title: 'Least recent', value: 'updatedAt,asc' },
                      { title: 'Highest rated ', value: 'rate,desc' },
                      { title: 'Lowest rated ', value: 'rate,asc' }
                    ]}
                  />
                </div>
              </div>

              {customer && <CustomerProductReview productId={product.id} />}

              <ProductReviewList
                params={productReviewFetchParams}
                setParams={setProductReviewFetchParams}
              />
            </div>
          </>
        )}
      />
    </PageContainer>
  )
}
