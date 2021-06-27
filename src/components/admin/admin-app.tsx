import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAdmin } from '../../services/admin-service'
import { Home } from '../../pages/admin'
import { Login } from '../../pages/admin/login'
import { Products } from './product'
import { Categories } from './category'

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
        </>
      ) : (
        <Route exact path="/admin">
          <Login />
        </Route>
      )}
    </Switch>
  )
}
