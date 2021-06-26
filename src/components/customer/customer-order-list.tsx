import { Table, Image, Modal } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { AsyncList } from '../shared/async-list'
import {
  orderKeys,
  orderService,
  useCustomerOrders
} from '../../services/order-service'
import { ButtonModal } from '../shared/button-modal'
import { AsyncButton } from '../shared/async-button'
import { queryClient } from '../../config/query-clinet'
import { UnorderedListOutlined } from '@ant-design/icons'
import { OrderStatus } from '../../types/dto'

const orderStatusColors: Record<OrderStatus, string> = {
  Pending: '#1890ff',
  Canceled: 'red',
  Shipped: 'green'
}

export const CustomerOrderList = () => {
  const ordersQuery = useCustomerOrders()
  return (
    <AsyncList
      data={ordersQuery.data}
      status={ordersQuery.status}
      render={orders => (
        <div>
          <Table
            rowKey="id"
            dataSource={orders}
            columns={[
              {
                title: 'ID',
                key: 'id',
                dataIndex: 'id'
              },
              {
                title: 'Created at',
                key: 'createdAt',
                dataIndex: 'createdAt',
                render: (_, order) =>
                  dayjs(order.createdAt).format('MMMM D, YYYY h:mm A')
              },
              {
                title: 'Shipping address',
                key: 'shippingAddress',
                dataIndex: 'shippingAddress'
              },
              {
                title: 'Note',
                key: 'note',
                dataIndex: 'note'
              },
              {
                title: 'Details',
                key: '_',
                dataIndex: '_',
                render: (_, order) => (
                  <ButtonModal
                    title="Order details"
                    buttonProps={{ icon: <UnorderedListOutlined /> }}
                    modalProps={{ width: 800 }}
                  >
                    <Table
                      rowKey="id"
                      dataSource={order.orderDetails}
                      columns={[
                        {
                          title: 'Product',
                          key: 'photo',
                          dataIndex: 'photo',
                          render: (_, orderDetail) => (
                            <div className="align-center">
                              <Image width={100} src={orderDetail.photo} />
                              <span className="px-8">
                                <Link to={`/products/${orderDetail.productId}`}>
                                  {orderDetail.name}
                                </Link>
                              </span>
                            </div>
                          )
                        },
                        {
                          title: 'Product ID',
                          dataIndex: 'productId',
                          key: 'productId'
                        },
                        {
                          title: 'Price',
                          key: 'price',
                          dataIndex: 'price',
                          render: price => `${price}$`
                        },
                        {
                          title: 'Quantity',
                          key: 'quantity',
                          dataIndex: 'quantity'
                        }
                      ]}
                    />
                  </ButtonModal>
                )
              },
              {
                title: 'Status',
                dataIndex: '',
                key: '',
                align: 'center',
                render: (_, order) => {
                  const color = orderStatusColors[order.status]
                  if (order.status === 'Pending') {
                    return (
                      <AsyncButton
                        style={{ color }}
                        asyncFn={() =>
                          new Promise((resolve, reject) => {
                            Modal.confirm({
                              content: 'Do you want to cancel your order?',
                              okText: 'Confirm',
                              async onOk() {
                                try {
                                  await orderService.cancel(order.id)
                                  queryClient.refetchQueries(
                                    orderKeys.customerOrders,
                                    {
                                      active: true
                                    }
                                  )
                                  resolve(null)
                                } catch (error) {
                                  reject(error)
                                }
                              },
                              onCancel() {
                                resolve(null)
                              }
                            })
                          })
                        }
                      >
                        {order.status}
                      </AsyncButton>
                    )
                  }
                  return <span style={{ color }}>{order.status}</span>
                }
              }
            ]}
          />
        </div>
      )}
    />
  )
}
