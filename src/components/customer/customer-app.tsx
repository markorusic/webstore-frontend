import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from '../../pages'
import { Cart } from '../../pages/cart'
import { Categories } from '../../pages/categories'
import { Login } from '../../pages/login'
import { Products } from '../../pages/products'
import { Product } from '../../pages/products/[id]'
import { Profile } from '../../pages/profile'
import { Register } from '../../pages/register'
import {
  AuthenticatedCustomerRoute,
  UnauthenticatedCustomerRoute
} from './customer-private-route'

export const CustomerApp = () => {
  return (
    <>
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
      <UnauthenticatedCustomerRoute path="/register">
        <Register />
      </UnauthenticatedCustomerRoute>
      <UnauthenticatedCustomerRoute path="/login">
        <Login />
      </UnauthenticatedCustomerRoute>
      <AuthenticatedCustomerRoute path="/profile">
        <Profile />
      </AuthenticatedCustomerRoute>
    </>
  )
}
