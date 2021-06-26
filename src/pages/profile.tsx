import { LogoutOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import React from 'react'
import { CustomerActionList } from '../components/customer/customer-action-list'
import { CustomerOrderList } from '../components/customer/customer-order-list'
import { CustomerUpdateForm } from '../components/customer/customer-update-form'
import { PageContainer } from '../components/customer/page-container'
import { queryClient } from '../config/query-clinet'
import { locale } from '../localization'
import { customerKeys, useCustomer } from '../services/customer-service'
import { UserDto } from '../types/dto'

export const Profile = () => {
  const [customer, { logout }] = useCustomer()
  const customerDetails = customer?.user as UserDto
  return (
    <PageContainer>
      <div className="space-between">
        <h1>
          {locale.welcome} {customerDetails.firstName}
        </h1>
        <Button danger onClick={logout} icon={<LogoutOutlined />}>
          {locale.logout}
        </Button>
      </div>

      <Tabs
        onChange={tab => {
          if (tab === 'actions') {
            queryClient.refetchQueries(customerKeys.customerActions, {
              active: true
            })
          }
        }}
      >
        <Tabs.TabPane tab="Profile details" key="update-form">
          <CustomerUpdateForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Orders" key="orders">
          <CustomerOrderList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Action history" key="actions">
          <CustomerActionList />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  )
}
