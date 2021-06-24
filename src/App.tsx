import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { queryClient } from './config/query-clinet'
import { Home } from './pages'
import { Categories } from './pages/categories'
import { Login } from './pages/login'
import { Products } from './pages/products'
import { Register } from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
