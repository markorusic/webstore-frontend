import React from 'react'
import { UserDto } from '../../../types/dto'
import { RecordTableProps } from '../../shared/crud/types'
import { SimpleTable } from '../../shared/simple-table'

export const CustomerTable = (props: RecordTableProps<UserDto>) => {
  return (
    <SimpleTable
      {...props}
      columns={[
        {
          name: 'id',
          title: 'ID',
          sorter: true,
          defaultSortOrder: 'descend'
        },
        {
          name: 'firstName',
          title: 'First name',
          sorter: true
        },
        {
          name: 'lastName',
          title: 'Last name',
          sorter: true
        }
      ]}
    />
  )
}
