import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { locale } from '../../localization'
import { useAdmin } from '../../services/admin-service'
import { NavLink } from '../../utils'

const baseItems: NavLink[] = [
  { title: locale.home, path: '/admin', icon: <HomeOutlined /> },
  {
    title: locale.products,
    path: '/admin/products',
    icon: <ShoppingOutlined />
  },
  {
    title: locale.categories,
    path: '/admin/categories',
    icon: <UnorderedListOutlined />
  }
]

export const PageContainer: FC = ({ children }) => {
  const [admin, { logout }] = useAdmin()
  const location = useLocation()

  return (
    <div className="page-content-container">
      <Menu className="justify-end" mode="horizontal">
        <Menu.SubMenu
          key="user"
          icon={<UserOutlined />}
          title={`${admin?.user.firstName} ${admin?.user.lastName}`}
        >
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            {locale.logout}
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>

      <div className="d-flex">
        <Menu selectedKeys={[location.pathname]}>
          {baseItems.map(item => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>

        <div className="w-100">{children}</div>
      </div>
    </div>
  )
}
