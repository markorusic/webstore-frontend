import { CloseOutlined } from '@ant-design/icons'
import { Button, InputNumber, Table } from 'antd'
import React from 'react'
import { PageContainer } from '../components/customer/page-container'
import { AsyncContainer } from '../components/shared/async-container'
import { locale } from '../localization'
import { useCart, useCartProducts } from '../services/cart-service'

export const Cart = () => {
  const cart = useCart()
  const cartProductsQuery = useCartProducts()

  return (
    <PageContainer>
      <h1>{locale.cart}</h1>

      <h3>
        {locale.cartProducts} ({cart.totalItems})
      </h3>

      <AsyncContainer
        data={cartProductsQuery.data}
        status={cartProductsQuery.status}
        render={products => (
          <Table
            rowKey="id"
            dataSource={products}
            columns={[
              {
                title: 'Product',
                dataIndex: 'name',
                key: 'name',
                render: (_, product) => (
                  <div className="align-center">
                    <img
                      style={{ width: '100px' }}
                      alt={product.name}
                      src={product.photo}
                    />
                    <span className="px-8">{product.name}</span>
                  </div>
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
                  const cartItem = cart.value.items.find(
                    item => item.productId.toString() === product.id.toString()
                  )
                  return (
                    <InputNumber
                      min={1}
                      defaultValue={cartItem?.quantity}
                      onChange={quantity =>
                        cart.add(product.id, { quantity, sumQuantities: false })
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
                  const cartItem = cart.value.items.find(
                    item => item.productId.toString() === product.id.toString()
                  )
                  return (
                    product.price * (cartItem ? cartItem.quantity : 1) + '$'
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
    </PageContainer>
  )
}
