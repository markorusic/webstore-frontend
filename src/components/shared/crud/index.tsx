import React, { useState } from 'react'
import { ButtonModal } from '../button-modal'
// import useCrud from './useCrud'
import { CrudProps } from './types'
import { PageParams } from '../../../types/dto'
import { QueryKey, useQuery } from 'react-query'
import { AsyncContainer } from '../async-container'
import { paginationAdapter } from '../../../utils/pagination-adapter'
import { PageHeader } from 'antd'

function Crud<
  PageItemDto,
  ItemDto,
  CreateDto,
  UpdateDto = CreateDto & { id: string | number },
  FetchPageParams extends PageParams = PageParams
>({
  id,
  entityService,
  messages = {
    title: 'Hi',
    createTitle: 'Crate',
    updateTitle: 'Update',
    submitText: 'Submit'
  },
  renderTable
}: CrudProps<PageItemDto, ItemDto, CreateDto, UpdateDto, FetchPageParams>) {
  const [tableParams, setTableParams] = useState<FetchPageParams>({
    // @ts-ignore
    page: 0,
    size: 10
  })

  const tableKey: QueryKey = [id, 'table', Object.values(tableParams)]
  const itemsQuery = useQuery(
    tableKey,
    () => entityService.fetchPage(tableParams),
    {
      keepPreviousData: true
    }
  )

  return (
    <div className="px-8 py-8">
      <PageHeader
        style={{ padding: 0 }}
        title={messages.title}
        onBack={window.history.back}
      />
      <div className="py-16">
        <AsyncContainer
          data={itemsQuery.data}
          status={itemsQuery.status}
          render={dataPage =>
            renderTable({
              rowKey: 'id',
              dataSource: dataPage.content,
              onChange: (pagination, filters, sorter) => {
                const params = {
                  page: (pagination.current ?? 1) - 1
                }

                // @ts-ignore
                if (sorter.order) {
                  // @ts-ignore
                  params.sort = [sorter.field, sorter.order.slice(0, -3)].join(
                    ','
                  )
                }

                Object.keys(filters).forEach(key => {
                  if (filters[key]) {
                    const value = filters[key]?.join(',')
                    // @ts-ignore
                    params[key] = value
                  }
                })
                // @ts-ignore
                setTableParams(({ size }) => {
                  return { size, ...params }
                })
              },
              pagination: {
                ...paginationAdapter({
                  pageSize: tableParams.size,
                  current: tableParams.page,
                  total: itemsQuery.data?.totalElements
                })
              }
            })
          }
        />
      </div>
    </div>
  )
}

export default Crud
