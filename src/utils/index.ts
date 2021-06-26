import { ReactNode } from 'react'

export const noop = () => undefined

export interface NavLink {
  title: string
  path: string
  icon?: ReactNode
}
