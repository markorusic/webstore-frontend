import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCustomer } from '../services/customer-service'

export const Profile = () => {
  const [customer, { logout }] = useCustomer()
  return (
    <PageContainer>
      <div className="space-between">
        <h1>{locale.profile}</h1>
        <Button danger onClick={logout} icon={<LogoutOutlined />}>
          {locale.logout}
        </Button>
      </div>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </PageContainer>
  )
}
