import { useEffect } from 'react'
import { createGlobalState } from 'react-use'
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
    const { data } = await http.get<CustomerDto>('/customers/me')
    return data
  },
  async update(dto: CustomerRegisterRequestDto) {
    const { data } = await http.put<CustomerDto>('/customers/update', dto)
    return data
  },
  async fetchActions(params: PageParams) {
    const { data } = await http.get<Page<UserLogAction>>(
      '/customers/me/actions',
      { params }
    )
    return data
  }
}

const useCustomerState = createGlobalState<
  CustomerLoginResponseDto | undefined
>(() => {
  try {
    const rawCart = localStorage.getItem('customer')
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

  useEffect(() => {
    if (customer) {
      localStorage.setItem('customer', JSON.stringify(customer))
    } else {
      localStorage.removeItem('customer')
    }
  }, [customer])

  return [customer, { login, logout }]
}
