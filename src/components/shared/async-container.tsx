import React, { ReactNode } from 'react'
import { Alert } from 'antd'
import { QueryStatus } from 'react-query'
import { locale } from '../../localization'
import { Spin } from './spin'

export interface AsyncContainerProps<T> {
  data: T | undefined
  status: QueryStatus
  render(data: T): ReactNode
}

export function AsyncContainer<T>({
  data,
  status,
  render
}: AsyncContainerProps<T>) {
  return (
    <Spin spinning={status === 'loading'}>
      {status === 'success' && data !== undefined && render(data)}

      {status === 'error' && (
        <Alert
          message={locale.error}
          description={locale.loadingError}
          type="error"
          showIcon
        />
      )}
    </Spin>
  )
}
