import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useCustomer } from '../../services/customer-service'

export const AuthenticatedCustomerRoute: FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const [customer] = useCustomer()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        customer ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export const UnauthenticatedCustomerRoute: FC<RouteProps> = ({
  children,
  ...rest
}) => {
  const [customer] = useCustomer()
  return (
    <Route
      {...rest}
      render={() =>
        customer ? (
          <Redirect
            to={{
              pathname: '/profile'
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
