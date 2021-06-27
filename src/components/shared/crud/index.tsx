import React, { useState } from 'react'
import { notification, PageHeader } from 'antd'
import { ButtonModal } from '../button-modal'
import { CrudProps, ID, Identifiable, RenderItemUtils } from './types'
import { PageParams } from '../../../types/dto'
import { QueryKey, useQuery } from 'react-query'
import { AsyncContainer } from '../async-container'
import { paginationAdapter } from '../../../utils/pagination-adapter'
import Modal from 'antd/lib/modal/Modal'
import { PlusCircleOutlined } from '@ant-design/icons'

const nullRender = () => null

function Crud<
  PageItemDto extends Identifiable,
  ItemDto,
  CreateDto,
  UpdateDto = CreateDto & { id: string | number },
  FetchPageParams extends PageParams = PageParams
>({
  id,
  entityService,
  messages = {
    title: '',
    createTitle: 'Create item',
    updateTitle: 'Update item'
  },
  initialFetchParams = {},
  renderCreateForm = nullRender,
  renderUpdateForm = nullRender,
  renderTable
}: CrudProps<PageItemDto, ItemDto, CreateDto, UpdateDto, FetchPageParams>) {
  // @ts-ignore
  const [tableParams, setTableParams] = useState<FetchPageParams>({
    page: 0,
    size: 10,
    ...initialFetchParams
  })
  const recordsKeys: QueryKey = [id, 'table', Object.values(tableParams)]
  const recordsQuery = useQuery(
    recordsKeys,
    () => entityService.fetchPage(tableParams),
    {
      keepPreviousData: true
    }
  )

  const [activeRecordId, setActiveRecordId] = useState<ID>()
  const activeRecordKey: QueryKey = [id, 'activeRecord', activeRecordId]
  const activeRecordQuery = useQuery(
    activeRecordKey,
    () => entityService.fetchById(activeRecordId as ID),
    {
      enabled: activeRecordId !== undefined
    }
  )

  const renderItemUtils: RenderItemUtils = {
    refreshRecords: () => recordsQuery.refetch(),
    refreshActiveRecord: () => activeRecordQuery.refetch()
  }

  return (
    <div>
      <PageHeader
        style={{ padding: 0 }}
        title={messages.title}
        onBack={() => window.history.back()}
      />

      {renderCreateForm !== nullRender && (
        <div className="py-8">
          <ButtonModal
            title={messages.createTitle ?? ''}
            buttonProps={{ type: 'primary', icon: <PlusCircleOutlined /> }}
            modalProps={{ width: 900, destroyOnClose: true }}
          >
            {modal =>
              renderCreateForm({
                ...renderItemUtils,
                async onSubmit(values) {
                  try {
                    await entityService.create(values as CreateDto)
                    notification.open({
                      type: 'success',
                      message: 'Successfully created!'
                    })
                    recordsQuery.refetch()
                    modal.setShowModal(false)
                  } catch (err) {
                    notification.open({
                      type: 'error',
                      message:
                        err?.response?.data?.message ?? 'An error occured!'
                    })
                  }
                }
              })
            }
          </ButtonModal>
        </div>
      )}

      <div className="py-8">
        <AsyncContainer
          data={recordsQuery.data}
          status={recordsQuery.status}
          render={dataPage =>
            renderTable({
              ...renderItemUtils,
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
                  total: recordsQuery.data?.totalElements
                })
              },
              rowClassName: 'cursor-pointer',
              onRow: record => ({
                onClick() {
                  setActiveRecordId(record.id)
                }
              })
            })
          }
        />
      </div>

      {renderUpdateForm !== nullRender && (
        <Modal
          visible={activeRecordId !== undefined}
          onCancel={() => setActiveRecordId(undefined)}
          width={900}
          destroyOnClose
          footer={null}
        >
          <AsyncContainer
            data={activeRecordQuery.data}
            status={activeRecordQuery.status}
            render={activeRecord =>
              renderUpdateForm({
                ...renderItemUtils,
                activeRecord,
                async onSubmit(values) {
                  try {
                    await entityService.update(values as UpdateDto)
                    notification.open({
                      type: 'success',
                      message: 'Successfully updated!'
                    })
                    activeRecordQuery.refetch()
                    recordsQuery.refetch()
                  } catch (err) {
                    notification.open({
                      type: 'error',
                      message:
                        err?.response?.data?.message ?? 'An error occured!'
                    })
                  }
                }
              })
            }
          />
        </Modal>
      )}
    </div>
  )
}

export default Crud
