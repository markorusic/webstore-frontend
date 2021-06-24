import React, { ReactNode } from 'react'
import { Alert } from 'antd'
import { QueryStatus } from 'react-query'
import { locale } from '../../localization'
import { Spin } from './spin'

export interface BaseListProps<T> {
  data: T[] | undefined
  status: QueryStatus
  renderItems(items: T[]): ReactNode
}

export function BaseList<T>({
  data = [],
  status,
  renderItems
}: BaseListProps<T>) {
  return (
    <Spin spinning={status === 'loading'}>
      {status === 'success' &&
        (data.length === 0 ? (
          <Alert
            message={locale.noData}
            description={locale.noDataForThatQuery}
            type="warning"
            showIcon
          />
        ) : (
          renderItems(data)
        ))}

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
