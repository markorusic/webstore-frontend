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

      <AsyncContainer
        data={cartProductsQuery.data}
        status={cartProductsQuery.status}
        render={products => {
          return <pre>{JSON.stringify(products, null, 2)}</pre>
        }}
      />
    </PageContainer>
  )
}
