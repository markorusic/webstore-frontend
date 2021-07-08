import React from 'react'
import { useState } from 'react'
import { QueryKey, useQuery } from 'react-query'
import { adminHttp } from '../../../services/admin-service'
import { PageParams, UserDto, UserLogAction, Page } from '../../../types/dto'
import { formatDate } from '../../../utils'
import { ID } from '../../shared/crud/types'
import { tableOnChangeAdapter } from '../../shared/crud/utils'
import { SimpleTable, SimpleTableProps } from '../../shared/simple-table'

type Props = SimpleTableProps<UserLogAction> & { customerId: ID }

export const CustomerActionTable = ({ customerId, ...props }: Props) => {
  const [params, setParams] = useState<PageParams>({ page: 0, size: 10 })

  const key: QueryKey = [
    'admin-customer-actions',
    customerId,
    ...Object.values(params)
  ]
  const actionsQuery = useQuery(
    key,
    async () => {
      const { data } = await adminHttp.get<Page<UserDto>>(
        '/admin/customers/findActions',
        {
          params: { customerId, ...params }
        }
      )
      return data
    },
    {
      enabled: !!customerId,
      keepPreviousData: true
    }
  )
  return (
    <SimpleTable
      {...props}
      loading={actionsQuery.isLoading}
      // @ts-ignore
      dataSource={actionsQuery.data?.content}
      onChange={tableOnChangeAdapter(params => {
        setParams(p => ({ ...p, ...params }))
      })}
      columns={[
        {
          title: 'Action',
          name: 'actionType'
        },
        {
          title: 'Datetime',
          name: 'createdAt',
          render: formatDate
        }
      ]}
    />
  )
}
