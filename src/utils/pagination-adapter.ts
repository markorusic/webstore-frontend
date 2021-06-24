import { PaginationProps } from 'antd'
import { noop } from '.'

type OmitedPaginationProps =
  | 'onChange'
  | 'current'
  | 'onShowSizeChange'
  | 'pageSize'

export interface AdaptedPaginationProps
  extends Omit<PaginationProps, OmitedPaginationProps> {
  current?: number | string | undefined
  pageSize?: number | string | undefined
  onChange?(page: string): void
  onShowSizeChange?(page: string, size: string): void
}

export const paginationAdapter = ({
  current,
  pageSize,
  onChange = noop,
  onShowSizeChange = noop,
  ...props
}: AdaptedPaginationProps): PaginationProps => {
  return {
    showSizeChanger: false,
    ...props,
    pageSize: pageSize ? parseInt(pageSize.toString()) : 10,
    current: current ? parseInt(current.toString()) + 1 : 1,
    onChange: page => onChange((page - 1).toString()),
    onShowSizeChange: (page, size) =>
      onShowSizeChange((page - 1).toString(), size.toString())
  }
}
