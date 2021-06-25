import { CloseOutlined } from '@ant-design/icons'
import { Table, InputNumber, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { locale } from '../../localization'
import { useCart, useCartProducts } from '../../services/cart-service'
import { AsyncList } from '../shared/async-list'

export const CartProductList = () => {
  const cart = useCart()
  const cartProductsQuery = useCartProducts()

  return (
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
                return product.price * (cartItem ? cartItem.quantity : 1) + '$'
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
  )
}
