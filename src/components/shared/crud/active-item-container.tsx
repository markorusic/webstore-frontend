import React from 'react'
import { Row, Typography } from 'antd'
import noop from 'lodash/noop'
import { FC } from 'react'

interface ActiveItemContainerProps<T = any> {
  title: string
  activeRecord?: T
  loading?: boolean
  refreshData?(): any
}

export const ActiveItemContainer: FC<ActiveItemContainerProps> = ({
  title,
  activeRecord,
  refreshData = noop,
  loading = false,
  children = null
}) => {
  return (
    <div>
      <Row justify="space-between" align="middle">
        <Typography.Title level={3}>{title}</Typography.Title>
      </Row>
      <div>{children}</div>
    </div>
  )
}
