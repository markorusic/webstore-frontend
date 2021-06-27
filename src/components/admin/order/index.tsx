import React from 'react'
import { notification, Radio, Space, Tabs } from 'antd'
import { adminHttp } from '../../../services/admin-service'
import { orderService } from '../../../services/order-service'
import { formatDate } from '../../../utils'
import {
  OrderDetailsTable,
  orderStatusColors
} from '../../customer/customer-order-list'
import Crud from '../../shared/crud'
import { emptyEntityService } from '../../shared/crud/utils'
import { Form, FormInputContainer, SubmitButton } from '../../shared/form'
import { SimpleTable } from '../../shared/simple-table'
import { PageContainer } from '../page-container'

export const Orders = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-orders"
        entityService={{ ...emptyEntityService, ...orderService }}
        messages={{ title: 'Orders', updateTitle: 'Order info' }}
        initialFetchParams={{ sort: 'createdAt,desc' }}
        renderTable={props => (
          <SimpleTable
            {...props}
            columns={[
              {
                name: 'id',
                title: 'ID',
                sorter: true
              },
              {
                name: 'createdAt',
                title: 'Created at',
                sorter: true,
                defaultSortOrder: 'descend',
                render: formatDate
              },
              {
                name: 'customer',
                title: 'Customer',
                render: (_, order) =>
                  `#${order.customer.id} ${order.customer.firstName} ${order.customer.lastName}`
              },
              {
                name: 'shippingAddress',
                title: 'Shipping Address'
              },
              {
                name: 'note',
                title: 'Note'
              },
              {
                name: 'status',
                title: 'Status',
                sorter: true,
                render: (_, order) => {
                  const color = orderStatusColors[order.status]
                  return <span style={{ color }}>{order.status}</span>
                }
              }
            ]}
          />
        )}
        renderUpdateForm={props => (
          <Tabs>
            <Tabs.TabPane tab="Basic info" key="order-info">
              <pre>{JSON.stringify(props.activeRecord, null, 2)}</pre>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Details" key="details">
              <OrderDetailsTable
                dataSource={props.activeRecord?.orderDetails}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Update status" key="chagne-status">
              <Form
                initialValues={{ status: props.activeRecord?.status }}
                onSubmit={values =>
                  adminHttp
                    .put(
                      '/orders/changeStatus',
                      {},
                      {
                        params: {
                          id: props.activeRecord?.id,
                          status: values.status
                        }
                      }
                    )
                    .then(() => {
                      notification.success({
                        message: 'Successfully updated order status!'
                      })
                    })
                    .catch(err => {
                      notification.error({
                        message:
                          err?.response?.data?.message ?? 'An error occured!'
                      })
                    })
                }
              >
                {form => (
                  <>
                    <FormInputContainer name="status" label="Status">
                      <Radio.Group
                        value={form.values.status}
                        onChange={event =>
                          form.setValues({ status: event.target.value })
                        }
                      >
                        <Space direction="vertical">
                          <Radio value="Pending">Pending</Radio>
                          <Radio value="Canceled">Canceled</Radio>
                          <Radio value="Shipped">Shipped</Radio>
                        </Space>
                      </Radio.Group>
                    </FormInputContainer>
                    <SubmitButton />
                  </>
                )}
              </Form>
            </Tabs.TabPane>
          </Tabs>
        )}
      />
    </PageContainer>
  )
}
