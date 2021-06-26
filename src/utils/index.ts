import { ReactNode } from 'react'

export const noop = () => undefined

export const identity = <T>(arg: T) => arg
export interface NavLink {
  title: string
  path: string
  icon?: ReactNode
}
