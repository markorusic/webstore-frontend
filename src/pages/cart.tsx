import {
  CheckOutlined,
  CloseOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import { Alert, Button, Col, InputNumber, Row, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/customer/page-container'
import { AsyncList } from '../components/shared/async-list'
import { locale } from '../localization'
import { useCart, useCartProducts } from '../services/cart-service'

export const Cart = () => {
  const cart = useCart()
  const cartProductsQuery = useCartProducts()

  return (
    <PageContainer>
      <h1>{locale.cart}</h1>

      {cart.totalItems === 0 ? (
        <Alert
          message={locale.noData}
          description={locale.emptyCart}
          type="warning"
          showIcon
          action={
            <Button size="large" icon={<ShoppingOutlined />}>
              <Link className="px-8 primary-text" to="/products">
                {locale.backToStore}
              </Link>
            </Button>
          }
        />
      ) : (
        <Row gutter={[32, 16]}>
          <Col sm={24} lg={16}>
            <h2>
              {locale.cartProducts} ({cart.totalItems})
            </h2>
            <hr />
            <AsyncList
              data={cartProductsQuery.data}
              status={cartProductsQuery.status}
              noDataMessage={locale.emptyCart}
              render={products => (
                <Table
                  rowKey="id"
                  pagination={false}
                  dataSource={products}
                  columns={[
                    {
                      title: 'Product',
                      dataIndex: 'name',
                      key: 'name',
                      render: (_, product) => (
                        <Link to={`/products/${product.id}`}>
                          <div className="align-center">
                            <img
                              style={{ width: '100px' }}
                              alt={product.name}
                              src={product.photo}
                            />
                            <span className="px-8">{product.name}</span>
                          </div>
                        </Link>
                      )
                    },
                    {
                      title: 'Price',
                      dataIndex: 'price',
                      key: 'price'
                    },
                    {
                      title: 'Quantity',
                      dataIndex: 'quantity',
                      key: 'quantity',
                      render: (_, product) => {
                        const cartItem = cart.byProductId[product.id]
                        return (
                          <InputNumber
                            min={1}
                            defaultValue={cartItem?.quantity}
                            onChange={quantity =>
                              cart.add(product.id, {
                                quantity,
                                sumQuantities: false
                              })
                            }
                          />
                        )
                      }
                    },
                    {
                      title: 'Total',
                      dataIndex: 'total',
                      key: 'total',
                      render: (_, product) => {
                        const cartItem = cart.byProductId[product.id]
                        return (
                          product.price * (cartItem ? cartItem.quantity : 1) +
                          '$'
                        )
                      }
                    },
                    {
                      title: '',
                      dataIndex: 'remove',
                      key: 'remove',
                      render: (_, product) => (
                        <Button
                          icon={<CloseOutlined />}
                          danger
                          onClick={() => cart.remove(product.id)}
                        />
                      )
                    }
                  ]}
                />
              )}
            />
          </Col>

          <Col sm={24} md={8}>
            <h2>{locale.checkout}</h2>
            <hr />
            <div className="py-16 cart-checkout-total">
              {locale.total}:{' '}
              {cart.value.items.reduce((acc, item) => {
                const product = cartProductsQuery.data?.find(
                  product => item.productId.toString() === product.id.toString()
                )
                return acc + item.quantity * (product ? product?.price : 0)
              }, 0)}
              {'$'}
            </div>

            <Button type="primary" size="large" icon={<CheckOutlined />}>
              {locale.order}
            </Button>
          </Col>
        </Row>
      )}
    </PageContainer>
  )
}
