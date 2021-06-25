import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter, Switch } from 'react-router-dom'
import { CustomerApp } from './components/customer/customer-app'
import { queryClient } from './config/query-clinet'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <CustomerApp />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
