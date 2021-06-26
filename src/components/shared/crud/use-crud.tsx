import React from 'react'

const CrudContext = React.createContext<null>(null)

export const useCrudContext = () => {
  const context = React.useContext(CrudContext)
  if (context === null) {
    throw new Error('useCrudContext must be used within CrudContext')
  }
  return context
}
