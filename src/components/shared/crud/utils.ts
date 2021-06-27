import { TablePaginationConfig } from 'antd'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { PageParams } from '../../../types/dto'
import { ID } from './types'

export const emptyEntityService = {
  fetchPage: async (_: PageParams) => null,
  fetchById: async (_: ID) => null,
  create: async (_: any) => null,
  update: async (_: any) => null
}

export const tableOnChangeAdapter =
  (fn: (params: Record<string, number | string>) => void) =>
  <T>(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    const params = {
      page: (pagination.current ?? 1) - 1
    }

    // @ts-ignore
    if (sorter.order) {
      // @ts-ignore
      params.sort = [sorter.field, sorter.order.slice(0, -3)].join(',')
    }

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        const value = filters[key]?.join(',')
        // @ts-ignore
        params[key] = value
      }
    })

    fn(params)
  }
