import { ReactNode } from 'react'
import dayjs from 'dayjs'

export const noop = () => undefined

export const identity = <T>(arg: T) => arg
export interface NavLink {
  title: string
  path: string
  icon?: ReactNode
}

export const formatDate = (date: string) =>
  dayjs(date).format('MMMM D, YYYY h:mm A')
