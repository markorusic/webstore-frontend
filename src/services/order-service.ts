import { useQuery } from 'react-query'
import { OrderDto, Page, PageParams } from '../types/dto'
import { adminHttp } from './admin-service'
import { customerHttp } from './customer-service'

export const orderService = {
  async fetchPage(params: PageParams & { sort?: 'createdAt,desc' }) {
    const { data } = await adminHttp.get<Page<OrderDto>>('/orders/findAll', {
      params
    })
    return data
  },
  async fetchById(id: string | number) {
    const { data } = await adminHttp.get<OrderDto>('/orders/findById', {
      params: { id }
    })
    return data
  },
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
