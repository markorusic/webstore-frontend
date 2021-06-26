import { useQuery } from 'react-query'
import { OrderDto } from '../types/dto'
import { customerHttp } from './customer-service'

export const orderService = {
  async me() {
    const { data } = await customerHttp.get<OrderDto[]>('/orders/me')
    return data
  },
  async cancel(id: string | number) {
    const { data } = await customerHttp.put<OrderDto>(
      '/orders/cancel',
      {},
      { params: { id } }
    )
    return data
  }
}

export const orderKeys = {
  customerOrders: 'customer_orders'
}

export const useCustomerOrders = () =>
  useQuery(orderKeys.customerOrders, orderService.me, {
    keepPreviousData: true
  })
