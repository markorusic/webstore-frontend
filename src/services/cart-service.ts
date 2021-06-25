import { useEffect, useMemo } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { createGlobalState } from 'react-use'
import { OrderDto, OrderRequestDto, ProductDto } from '../types/dto'
import { customerHttp } from './customer-service'
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
      items: value.items.filter(
        item => item.productId.toString() !== productId.toString()
      )
    })
  }

  const checkout = async (
    shippingInfo: Omit<OrderRequestDto, 'orderDetails'>
  ) => {
    const dto: OrderRequestDto = {
      ...shippingInfo,
      orderDetails: value.items
    }
    const order = await customerHttp.post<OrderDto>('/orders/save', dto)
    setValue({ ...initalCart })
    return order
  }

  const totalItems = useMemo(() => {
    return value.items.reduce(
      (currentValue, currentItem) => currentValue + currentItem.quantity,
      0
    )
  }, [value.items])

  const byProductId = useMemo(() => {
    return value.items.reduce((map, item) => {
      map[item.productId] = item
      return map
    }, {} as Record<string, CartItem>)
  }, [value.items])

  useEffect(() => {
    localStorage.setItem(cartKeys.cart, JSON.stringify(value))
  }, [value])

  return { value, setValue, add, remove, checkout, byProductId, totalItems }
}

export const useCartProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  const cart = useCart()
  const productIds = cart.value.items.map(item => item.productId)
  const query = useQuery(
    [cartKeys.cartProducts, productIds],
    () => productService.fetchByIds(productIds),
    {
      keepPreviousData: true,
      ...options
    }
  )

  useEffect(() => {
    if (query.isSuccess && query.data.length !== cart.value.items.length) {
      const productIds = query.data.map(product => product.id)
      cart.setValue(({ items, ...rest }) => ({
        ...rest,
        items: items.filter(item => productIds.includes(item.productId))
      }))
    }
  }, [query.data, query.isSuccess, cart])

  return query
}
