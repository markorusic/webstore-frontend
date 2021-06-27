import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { useCustomer } from '../../services/customer-service'
import { useCart } from '../../services/cart-service'
import {
  CheckCircleOutlined,
  HomeOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { locale } from '../../localization'
import { NavLink } from '../../utils'

const baseItems: NavLink[] = [
  { title: locale.home, path: '/', icon: <HomeOutlined /> },
  {
    title: locale.categories,
    path: '/categories',
    icon: <UnorderedListOutlined />
  },
  { title: locale.products, path: '/products', icon: <ShoppingOutlined /> }
]

const authenticatedCustomerItems: NavLink[] = [
  { title: locale.profile, path: '/profile', icon: <UserOutlined /> }
]

const unauthenticatedCustomerItems: NavLink[] = [
  { title: locale.login, path: '/login', icon: <LoginOutlined /> },
  { title: locale.register, path: '/register', icon: <CheckCircleOutlined /> }
]

export const PageContainer: FC = ({ children }) => {
  const cart = useCart()
  const [customer] = useCustomer()
  const location = useLocation()

  return (
    <div className="page-content-container px-8">
      <div className="customer-top-menu-container">
        <Menu selectedKeys={[location.pathname]} mode="horizontal">
          {baseItems.map(item => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>

        <Menu selectedKeys={[location.pathname]} mode="horizontal">
          {(customer
            ? authenticatedCustomerItems
            : unauthenticatedCustomerItems
          ).map(item => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">
              {locale.cart} ({cart.totalItems})
            </Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className="py-16">{children}</div>
    </div>
  )
}
