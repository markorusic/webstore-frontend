import axios from 'axios'
import { useCallback } from 'react'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { createGlobalState } from 'react-use'
import { env } from '../config/env'
import {
  UserDto,
  LoginRequestDto,
  LoginResponseDto,
  CustomerRegisterRequestDto,
  Page,
  PageParams,
  UserLogAction
} from '../types/dto'
import { AuthService } from '../utils'
import { http } from '../utils/http'

export const customerHttp = axios.create({
  baseURL: env.API_BASE_URL
})

export const customerService = {
  async register(dto: CustomerRegisterRequestDto) {
    const { data } = await http.post<UserDto>('/customers/register', dto)
    return data
  },
  async login(dto: LoginRequestDto) {
    const { data } = await http.post<LoginResponseDto>('/customers/login', dto)
    return data
  },
  async me() {
    const { data } = await customerHttp.get<UserDto>('/customers/me')
    return data
  },
  async update(dto: UserDto) {
    const { data } = await customerHttp.put<UserDto>('/customers/update', dto)
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

const useCustomerState = createGlobalState<LoginResponseDto | undefined>(() => {
  try {
    const rawCart = localStorage.getItem(customerKeys.customer)
    const cart = rawCart ? JSON.parse(rawCart) : undefined
    return cart
  } catch {
    return undefined
  }
})

type UseCustomerReturnType = [
  LoginResponseDto | undefined,
  {
    login(dto: LoginRequestDto): Promise<LoginResponseDto>
    update(dto: UserDto): Promise<UserDto>
    logout(): void
  }
]

const customerAuthSerivce = new AuthService(customerKeys.customer, customerHttp)

customerAuthSerivce.init()

export const useCustomer = (): UseCustomerReturnType => {
  const [customer, setCustomer] = useCustomerState()

  const login = async (dto: LoginRequestDto) => {
    const customer = await customerService.login(dto)
    customerAuthSerivce.login(customer)
    setCustomer(customer)
    return customer
  }

  const logout = useCallback(() => {
    setCustomer(undefined)
    customerAuthSerivce.logout()
  }, [setCustomer])

  const update = async (dto: UserDto) => {
    const updatedCustomer = await customerService.update(dto)
    setCustomer(
      customer => ({ ...customer, user: updatedCustomer } as LoginResponseDto)
    )
    return updatedCustomer
  }

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
