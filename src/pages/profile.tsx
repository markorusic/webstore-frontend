import { LogoutOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import React from 'react'
import { CustomerActionList } from '../components/customer/customer-action-list'
import { CustomerUpdateForm } from '../components/customer/customer-update-form'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCustomer } from '../services/customer-service'
import { CustomerDto } from '../types/dto'

export const Profile = () => {
  const [customer, { logout }] = useCustomer()
  const customerDetails = customer?.user as CustomerDto
  return (
    <PageContainer>
      <div className="space-between">
        <h1>Welcome {customerDetails.firstName}</h1>
        <Button danger onClick={logout} icon={<LogoutOutlined />}>
          {locale.logout}
        </Button>
      </div>

      <Tabs>
        <Tabs.TabPane tab="Profile details" key="profile-details">
          <CustomerUpdateForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Action history" key="profile-actions">
          <CustomerActionList />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  )
}
