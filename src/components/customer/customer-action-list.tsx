import { Pagination, Table } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useCustomerActions } from '../../services/customer-service'
import { PageParams } from '../../types/dto'
import { paginationAdapter } from '../../utils/pagination-adapter'
import { AsyncList } from '../shared/async-list'

export const CustomerActionList = () => {
  const [params, setParams] = useState<PageParams>({ page: 0, size: 10 })
  const actionsQuery = useCustomerActions(params)
  return (
    <AsyncList
      data={actionsQuery.data?.content}
      status={actionsQuery.status}
      render={actions => (
        <div>
          <Table
            pagination={false}
            dataSource={actions}
            columns={[
              {
                title: 'Action',
                key: 'actionType',
                dataIndex: 'actionType'
              },
              {
                title: 'Datetime',
                key: 'createdAt',
                dataIndex: 'createdAt',
                render: (_, action) =>
                  dayjs(action.createdAt).format('MMMM D, YYYY h:mm A')
              }
            ]}
          />

          <Pagination
            {...paginationAdapter({
              pageSize: params.size,
              current: params.page,
              total: actionsQuery.data?.totalElements,
              onChange: page =>
                setParams(params => ({
                  ...params,
                  page
                }))
            })}
          />
        </div>
      )}
    />
  )
}
