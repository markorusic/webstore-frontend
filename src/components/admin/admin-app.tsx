import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from '../../pages/admin'
import { Login } from '../../pages/admin/login'
import { useAdmin } from '../../services/admin-service'

export const AdminApp = () => {
  const [admin] = useAdmin()
  return (
    <Switch>
      {admin ? (
        <Route exact path="/admin">
          <Home />
        </Route>
      ) : (
        <Route exact path="/admin">
          <Login />
        </Route>
      )}
    </Switch>
  )
}
