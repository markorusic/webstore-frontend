import { TableProps } from 'antd'
import { ComponentType, FC, FunctionComponent, ReactNode } from 'react'
import { Page, PageParams } from '../../../types/dto'
import { SimpleTableProps } from '../../simple-table'

export type ID = string | number

export interface EntityService<
  PageItemDto,
  ItemDto,
  CreateDto,
  UpdateDto = CreateDto & { id: string | number },
  FetchPageParams extends PageParams = PageParams
> {
  fetchPage(params: FetchPageParams): Promise<Page<PageItemDto>>
  create(dto: CreateDto): Promise<ItemDto>
  update(dto: UpdateDto): Promise<ItemDto>
  findById(id: ID): Promise<ItemDto>
}

export interface CrudMessages {
  title: string
  createTitle: string
  updateTitle: string
  submitText: string
}

export interface CreateComponentProps<ItemDto> {
  initialValues: Partial<ItemDto>
  onSubmit(dto: ItemDto): Promise<ItemDto>
  submitText?: string
  submitIcon?: ReactNode
  successMessage?: string
  errorMessage?: string
}

export interface TableComponentProps<PageItemDto> {
  stagod?: string
}

export interface CrudProps<
  PageItemDto,
  ItemDto,
  CreateDto,
  UpdateDto = CreateDto & { id: string | number },
  FetchPageParams extends PageParams = PageParams
> {
  id: string
  entityService: EntityService<
    PageItemDto,
    ItemDto,
    CreateDto,
    UpdateDto,
    FetchPageParams
  >
  messages?: CrudMessages
  //   CreateComponent: FC<CreateComponentProps<ItemDto>>
  //   UpdateComponent: FC
  //   TableComponent: FC<TableComponentProps<PageItemDto>>
  renderTable(props: SimpleTableProps<PageItemDto>): ReactNode
}
