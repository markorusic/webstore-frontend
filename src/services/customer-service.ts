import { AxiosInstance } from 'axios'
import { useCallback, useEffect } from 'react'
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
import { identity } from '../utils'
import { http } from '../utils/http'

export const customerHttp = { ...http } as AxiosInstance

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

export const useCustomer = (): UseCustomerReturnType => {
  const [customer, setCustomer] = useCustomerState()

  const login = async (dto: LoginRequestDto) => {
    const customer = await customerService.login(dto)
    setCustomer(customer)
    return customer
  }

  const logout = useCallback(() => setCustomer(undefined), [setCustomer])

  const update = async (dto: UserDto) => {
    const updatedCustomer = await customerService.update(dto)
    setCustomer(
      customer => ({ ...customer, user: updatedCustomer } as LoginResponseDto)
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

      customerHttp.interceptors.response.use(identity, error => {
        if (401 === error.response.status) {
          logout()
        } else {
          return Promise.reject(error)
        }
      })
    } else {
      localStorage.removeItem(customerKeys.customer)
    }
  }, [customer, logout])

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
