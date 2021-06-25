import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useCustomer } from '../../hooks/use-customer'
import { useCart } from '../../services/cart-service'

export interface NavLink {
  title: string
  path: string
}

const baseItems: NavLink[] = [
  { title: 'Home', path: '/' },
  { title: 'Categories', path: '/categories' },
  { title: 'Products', path: '/products' }
]

const authenticatedCustomerItems: NavLink[] = [
  { title: 'Profile', path: '/profile' }
]

const unauthenticatedCustomerItems: NavLink[] = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' }
]

export const PageContainer: FC = ({ children }) => {
  const cart = useCart()
  const customer = useCustomer()
  const location = useLocation()

  return (
    <div className="page-content-container">
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        {baseItems.map(item => (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}

        {(customer
          ? authenticatedCustomerItems
          : unauthenticatedCustomerItems
        ).map(item => (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}

        <Menu.Item key="/cart">
          <Link to="/cart">Cart ({cart.totalItems})</Link>
        </Menu.Item>
      </Menu>

      <div className="py-16">{children}</div>
    </div>
  )
}
