import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withAuth, withUnauth } from './utils'
import { Home } from '../../pages'
import { Cart } from '../../pages/cart'
import { Categories } from '../../pages/categories'
import { Login } from '../../pages/login'
import { Products } from '../../pages/products'
import { Product } from '../../pages/products/[id]'
import { Profile } from '../../pages/profile'
import { Register } from '../../pages/register'

const AuthenticatedProfile = withAuth(Profile)
const UnauthenticatedLogin = withUnauth(Login)
const UnauthenticatedRegister = withUnauth(Register)

export const CustomerApp = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/products">
        <Products />
      </Route>
      <Route path="/products/:id">
        <Product />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/categories">
        <Categories />
      </Route>
      <Route path="/register">
        <UnauthenticatedRegister />
      </Route>
      <Route path="/login">
        <UnauthenticatedLogin />
      </Route>
      <Route path="/profile">
        <AuthenticatedProfile />
      </Route>
    </Switch>
  )
}
