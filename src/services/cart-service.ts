import { useEffect, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { createGlobalState } from 'react-use'
import { ProductDto } from '../types/dto'
import { productService } from './products-service'

export const cartKeys = {
  cart: 'cart',
  cartProducts: 'cartProducts'
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
}

const initalCart: Cart = { items: [] }

const useGlobalCartState = createGlobalState<Cart>(() => {
  try {
    const rawCart = localStorage.getItem(cartKeys.cart)
    const cart = rawCart ? JSON.parse(rawCart) : initalCart
    return cart
  } catch {
    return initalCart
  }
})

export const useCart = () => {
  const [value, setValue] = useGlobalCartState()

  const add = (
    productId: string,
    { quantity = 1, sumQuantities = true } = {}
  ) => {
    const cartItem = value.items.find(item => item.productId === productId)
    if (!cartItem) {
      setValue({
        ...value,
        items: [{ productId, quantity }, ...(value ? value.items : [])]
      })
    } else {
      let newQuantity = cartItem.quantity
      if (sumQuantities) {
        newQuantity += quantity
      } else {
        newQuantity = quantity
      }
      setValue({
        ...value,
        items: value.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      })
    }
  }

  const remove = (productId: string) => {
    setValue({
      ...value,
      items: value.items.filter(item => item.productId !== productId)
    })
  }

  const totalItems = useMemo(() => {
    return value.items.reduce(
      (currentValue, currentItem) => currentValue + currentItem.quantity,
      0
    )
  }, [value.items])

  useEffect(() => {
    localStorage.setItem(cartKeys.cart, JSON.stringify(value))
  }, [value])

  return { value, add, remove, totalItems }
}

export const useCartProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  const cart = useCart()
  const productIds = cart.value.items.map(item => item.productId)
  const query = useQuery(
    [cartKeys.cartProducts, productIds],
    () => productService.fetchByIds(productIds),
    {
      keepPreviousData: true,
      enabled: productIds.length > 0,
      ...options
    }
  )
  return query
}
