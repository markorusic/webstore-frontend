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
            message={locale.commons.noData}
            description={locale.commons.noDataForThatQuery}
            type="warning"
            showIcon
          />
        ) : (
          renderItems(data)
        ))}

      {status === 'error' && (
        <Alert
          message={locale.commons.error}
          description={locale.commons.loadingError}
          type="error"
          showIcon
        />
      )}
    </Spin>
  )
}
