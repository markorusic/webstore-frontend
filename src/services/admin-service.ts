import { AxiosInstance } from 'axios'
import { useEffect } from 'react'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { createGlobalState } from 'react-use'
import { env } from '../config/env'
import {
  LoginRequestDto,
  Page,
  PageParams,
  UserLogAction,
  LoginResponseDto,
  UserDto
} from '../types/dto'
import { http } from '../utils/http'

export const adminHttp = { ...http } as AxiosInstance

export const adminService = {
  async login(dto: LoginRequestDto) {
    const { data } = await http.post<LoginResponseDto>('/admins/login', dto)
    return data
  },
  async me() {
    const { data } = await adminHttp.get<UserDto>('/admins/me')
    return data
  },
  async fetchActions(params: PageParams) {
    const { data } = await adminHttp.get<Page<UserLogAction>>(
      '/admins/me/actions',
      { params: { ...params, sort: 'createdAt,desc' } }
    )
    return data
  }
}

export const adminKeys = {
  admin: 'admin',
  adminActions: 'adminActions'
}

const useAdminState = createGlobalState<LoginResponseDto | undefined>(() => {
  try {
    const rawCart = localStorage.getItem(adminKeys.admin)
    const cart = rawCart ? JSON.parse(rawCart) : undefined
    return cart
  } catch {
    return undefined
  }
})

type UseAdminReturnType = [
  LoginResponseDto | undefined,
  {
    login(dto: LoginRequestDto): Promise<LoginResponseDto>
    logout(): void
  }
]

export const useAdmin = (): UseAdminReturnType => {
  const [admin, setAdmin] = useAdminState()

  const login = async (dto: LoginRequestDto) => {
    const admin = await adminService.login(dto)
    setAdmin(admin)
    return admin
  }

  const logout = () => setAdmin(undefined)

  useEffect(() => {
    if (admin) {
      localStorage.setItem(adminKeys.admin, JSON.stringify(admin))
      adminHttp.interceptors.request.use(request => {
        request.headers[env.API_TOKEN_HEADER] = admin.token
        return request
      })
    } else {
      localStorage.removeItem(adminKeys.admin)
    }
  }, [admin])

  return [admin, { login, logout }]
}

export const useAdminActions = (
  params: PageParams,
  options?: UseQueryOptions<Page<UserLogAction>>
) => {
  const key: QueryKey = [adminKeys.adminActions, ...Object.values(params)]
  const query = useQuery(key, () => adminService.fetchActions(params), {
    keepPreviousData: true,
    ...options
  })
  return query
}
