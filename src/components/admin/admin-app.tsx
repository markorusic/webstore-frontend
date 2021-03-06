import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAdmin } from '../../services/admin-service'
import { Home } from '../../pages/admin'
import { Login } from '../../pages/admin/login'
import { Products } from './product'
import { Categories } from './category'
import { Orders } from './order'
import { Customers } from './customer'

export const AdminApp = () => {
  const [admin] = useAdmin()
  return (
    <Switch>
      {admin ? (
        <>
          <Route exact path="/admin">
            <Home />
          </Route>
          <Route path="/admin/products">
            <Products />
          </Route>
          <Route path="/admin/categories">
            <Categories />
          </Route>
          <Route path="/admin/orders">
            <Orders />
          </Route>
          <Route path="/admin/customers">
            <Customers />
          </Route>
        </>
      ) : (
        <>
          <Route exact path="/admin">
            <Login />
          </Route>
          <Route path="/admin/**">
            <Login />
          </Route>
        </>
      )}
    </Switch>
  )
}
