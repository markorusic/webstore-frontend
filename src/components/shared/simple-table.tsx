import React from 'react'
import { TableProps } from 'antd'
import Table, { ColumnType } from 'antd/lib/table'

export interface SimpleTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns?: (Omit<ColumnType<T>, 'dataIndex' | 'key'> & { name: string })[]
}

export const SimpleTable = <T,>({
  columns = [],
  ...props
}: SimpleTableProps<T>) => {
  return (
    <Table
      {...props}
      // @ts-ignore
      columns={columns.map(({ name, ...column }) => ({
        ...column,
        dataIndex: name,
        key: name
      }))}
    />
  )
}
