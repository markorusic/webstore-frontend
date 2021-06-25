import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { queryClient } from './config/query-clinet'
import { Home } from './pages'
import { Cart } from './pages/cart'
import { Categories } from './pages/categories'
import { Login } from './pages/login'
import { Products } from './pages/products'
import { Product } from './pages/products/[id]'
import { Profile } from './pages/profile'
import { Register } from './pages/register'

const CustomerRoutes = () => {
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
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <CustomerRoutes />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
