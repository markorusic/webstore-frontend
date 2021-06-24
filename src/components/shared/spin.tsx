import React from 'react'
import { Spin as BaseSpin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface Props extends React.ComponentProps<typeof BaseSpin> {
  children: React.ReactNode
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export const Spin: React.FC<Props> = props => (
  <BaseSpin indicator={antIcon} {...props} />
)
