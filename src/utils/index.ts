import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { LoginResponseDto } from '../types/dto'
import { AxiosInstance } from 'axios'
import { env } from '../config/env'

export const noop = () => undefined

export const identity = <T>(arg: T) => arg
export interface NavLink {
  title: string
  path: string
  icon?: ReactNode
}

export const formatDate = (date: string) =>
  dayjs(date).format('MMMM D, YYYY h:mm A')

export class AuthService {
  private requestInterceptorId: number | undefined

  private responseInterceptorId: number | undefined

  constructor(public key: string, public httpClient: AxiosInstance) {}

  private getUser = () => {
    try {
      const rawUser = localStorage.getItem(this.key)
      const user = (
        rawUser ? JSON.parse(rawUser) : undefined
      ) as LoginResponseDto
      return user
    } catch (e) {
      return undefined
    }
  }

  private setUser = (user: LoginResponseDto | undefined) => {
    if (user) {
      localStorage.setItem(this.key, JSON.stringify(user))
    } else {
      localStorage.removeItem(this.key)
    }
  }

  private clearInterceptors = () => {
    if (this.requestInterceptorId) {
      this.httpClient.interceptors.request.eject(this.requestInterceptorId)
    }
    if (this.responseInterceptorId) {
      this.httpClient.interceptors.response.eject(this.responseInterceptorId)
    }
  }

  private setupInterceptors = () => {
    const user = this.getUser()
    if (user) {
      this.requestInterceptorId = this.httpClient.interceptors.request.use(
        request => {
          request.headers[env.API_TOKEN_HEADER] = user.token
          return request
        }
      )
      this.responseInterceptorId = this.httpClient.interceptors.response.use(
        identity,
        error => {
          if (error.response.status === 401) {
            localStorage.removeItem(this.key)
          }
          return Promise.reject(error)
        }
      )
    }
  }

  public init = () => {
    this.setupInterceptors()
  }

  public login = (user: LoginResponseDto) => {
    this.setUser(user)
    this.clearInterceptors()
    this.setupInterceptors()
  }

  public logout = () => {
    this.setUser(undefined)
    this.clearInterceptors()
  }
}
