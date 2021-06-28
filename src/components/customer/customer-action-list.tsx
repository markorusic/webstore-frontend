import React, { useState } from 'react'
import { useCustomerActions } from '../../services/customer-service'
import { PageParams } from '../../types/dto'
import { paginationAdapter } from '../../utils/pagination-adapter'
import { AsyncList } from '../shared/async-list'
import { SimpleTable } from '../shared/simple-table'
import { formatDate } from '../../utils'
import { tableOnChangeAdapter } from '../shared/crud/utils'

export const CustomerActionList = () => {
  const [params, setParams] = useState<PageParams>({ page: 0, size: 10 })
  const actionsQuery = useCustomerActions(params)
  return (
    <AsyncList
      data={actionsQuery.data?.content}
      status={actionsQuery.status}
      render={actions => (
        <SimpleTable
          rowKey="id"
          dataSource={actions}
          onChange={tableOnChangeAdapter(params => {
            setParams(p => ({ ...p, ...params }))
          })}
          pagination={{
            ...paginationAdapter({
              pageSize: params.size,
              current: params.page,
              total: actionsQuery.data?.totalElements
            })
          }}
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
      )}
    />
  )
}
