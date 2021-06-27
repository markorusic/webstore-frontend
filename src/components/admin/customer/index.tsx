import { Tabs } from 'antd'
import React from 'react'
import { adminHttp } from '../../../services/admin-service'
import { Page, PageParams, UserDto } from '../../../types/dto'
import Crud from '../../shared/crud'
import { ID } from '../../shared/crud/types'
import { PageContainer } from '../page-container'
import { CustomerActionTable } from './customer-action-table'
import { CustomerCreateForm } from './customer-create-form'
import { CustomerTable } from './customer-table'
import { CustomerUpdateForm } from './customer-update-form'

export interface AdminCustomerRequestDto {
  id?: ID
  firstName: string
  lastName: string
  password?: string
  email: string
}

const adminCustomerService = {
  fetchPage: async (params: PageParams & { sort: 'id,desc' }) => {
    const { data } = await adminHttp.get<Page<UserDto>>(
      '/admin/customers/findAll',
      {
        params
      }
    )
    return data
  },
  fetchById: async (id: ID) => {
    const { data } = await adminHttp.get<UserDto>('/admin/customers/findById', {
      params: { id }
    })
    return data
  },
  create: async (dto: AdminCustomerRequestDto) => {
    const { data } = await adminHttp.post<UserDto>('/admin/customers/save', dto)
    return data
  },
  update: async (dto: AdminCustomerRequestDto) => {
    const { data } = await adminHttp.put<UserDto>(
      '/admin/customers/update',
      dto
    )
    return data
  }
}

export const Customers = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-customers"
        entityService={adminCustomerService}
        initialFetchParams={{ sort: 'id,desc' }}
        messages={{
          title: 'Customer',
          createTitle: 'Create customer',
          updateTitle: 'Update customer'
        }}
        renderTable={props => <CustomerTable {...props} />}
        renderCreateForm={props => <CustomerCreateForm {...props} />}
        renderUpdateForm={props => (
          <Tabs>
            <Tabs.TabPane tab="Info" key="info">
              <CustomerUpdateForm {...props} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Action history" key="actions">
              <CustomerActionTable />
            </Tabs.TabPane>
          </Tabs>
        )}
      />
    </PageContainer>
  )
}
