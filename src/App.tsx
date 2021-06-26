import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { AdminApp } from './components/admin/admin-app'
import { CustomerApp } from './components/customer/customer-app'
import { queryClient } from './config/query-clinet'

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CustomerApp />
        <AdminApp />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
