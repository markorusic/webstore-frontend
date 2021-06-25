import { CheckOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartCheckoutForm } from '../components/customer/cart-checkout-form'
import { CartProductList } from '../components/customer/cart-product-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCart, useCartProducts } from '../services/cart-service'
import { useCustomer } from '../services/customer-service'

export const Cart = () => {
  const [customer] = useCustomer()
  const cart = useCart()
  const cartProductsQuery = useCartProducts()
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

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
            <CartProductList />
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

            {customer ? (
              <Button
                type="primary"
                size="large"
                icon={<CheckOutlined />}
                onClick={() => setShowCheckoutModal(true)}
              >
                {locale.checkout}
              </Button>
            ) : (
              <Alert
                message="You're not logged in"
                description={
                  <>
                    <Link to="/login">{locale.login}</Link> in order to checkout
                  </>
                }
                type="warning"
                showIcon
              />
            )}
          </Col>
        </Row>
      )}

      <Modal
        title={customer ? 'Enter checkout information' : ''}
        visible={showCheckoutModal}
        footer={null}
        onCancel={() => setShowCheckoutModal(false)}
        destroyOnClose
      >
        <CartCheckoutForm />
      </Modal>
    </PageContainer>
  )
}
