import { AxiosInstance } from 'axios'
import { useEffect } from 'react'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { createGlobalState } from 'react-use'
import { env } from '../config/env'
import {
  CustomerDto,
  CustomerLoginRequestDto,
  CustomerLoginResponseDto,
  CustomerRegisterRequestDto,
  Page,
  PageParams,
  UserLogAction
} from '../types/dto'
import { http } from '../utils/http'

export const customerHttp = { ...http } as AxiosInstance

export const customerService = {
  async register(dto: CustomerRegisterRequestDto) {
    const { data } = await http.post<CustomerDto>('/customers/register', dto)
    return data
  },
  async login(dto: CustomerLoginRequestDto) {
    const { data } = await http.post<CustomerLoginResponseDto>(
      '/customers/login',
      dto
    )
    return data
  },
  async me() {
    const { data } = await customerHttp.get<CustomerDto>('/customers/me')
    return data
  },
  async update(dto: CustomerDto) {
    const { data } = await customerHttp.put<CustomerDto>(
      '/customers/update',
      dto
    )
    return data
  },
  async fetchActions(params: PageParams) {
    const { data } = await customerHttp.get<Page<UserLogAction>>(
      '/customers/me/actions',
      { params: { ...params, sort: 'createdAt,desc' } }
    )
    return data
  }
}

export const customerKeys = {
  customer: 'customer',
  customerActions: 'customerActions'
}

const useCustomerState = createGlobalState<
  CustomerLoginResponseDto | undefined
>(() => {
  try {
    const rawCart = localStorage.getItem(customerKeys.customer)
    const cart = rawCart ? JSON.parse(rawCart) : undefined
    return cart
  } catch {
    return undefined
  }
})

type UseCustomerReturnType = [
  CustomerLoginResponseDto | undefined,
  {
    login(dto: CustomerLoginRequestDto): Promise<CustomerLoginResponseDto>
    update(dto: CustomerDto): Promise<CustomerDto>
    logout(): void
  }
]

export const useCustomer = (): UseCustomerReturnType => {
  const [customer, setCustomer] = useCustomerState()

  const login = async (dto: CustomerLoginRequestDto) => {
    const customer = await customerService.login(dto)
    setCustomer(customer)
    return customer
  }

  const logout = () => setCustomer(undefined)

  const update = async (dto: CustomerDto) => {
    const updatedCustomer = await customerService.update(dto)
    setCustomer(
      customer =>
        ({ ...customer, user: updatedCustomer } as CustomerLoginResponseDto)
    )
    return updatedCustomer
  }

  useEffect(() => {
    if (customer) {
      localStorage.setItem(customerKeys.customer, JSON.stringify(customer))
      customerHttp.interceptors.request.use(request => {
        request.headers[env.API_TOKEN_HEADER] = customer.token
        return request
      })
    } else {
      localStorage.removeItem(customerKeys.customer)
    }
  }, [customer])

  return [customer, { login, update, logout }]
}

export const useCustomerActions = (
  params: PageParams,
  options?: UseQueryOptions<Page<UserLogAction>>
) => {
  const key: QueryKey = [customerKeys.customerActions, ...Object.values(params)]
  const query = useQuery(key, () => customerService.fetchActions(params), {
    keepPreviousData: true,
    ...options
  })
  return query
}
