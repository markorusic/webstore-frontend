import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCustomer } from '../../services/customer-service'

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const [customer] = useCustomer()
    if (!customer) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    return <Component {...props} />
  }
}

export function withUnauth<T>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const [customer] = useCustomer()
    if (customer) {
      return <Redirect to={{ pathname: '/profile' }} />
    }
    return <Component {...props} />
  }
}
