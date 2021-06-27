import { ReactNode } from 'react'
import { Page, PageParams } from '../../../types/dto'
import { SimpleTableProps } from '../simple-table'
import { FormProps } from '../form'

export type ID = string | number

export type Identifiable = {
  id: ID
}

export interface EntityService<
  PageItemDto extends Identifiable,
  ItemDto,
  CreateDto,
  UpdateDto = CreateDto & { id: string | number },
  FetchPageParams extends PageParams = PageParams
> {
  fetchPage(params: FetchPageParams): Promise<Page<PageItemDto>>
  fetchById(id: ID): Promise<ItemDto>
  create(dto: CreateDto): Promise<ItemDto>
  update(dto: UpdateDto): Promise<ItemDto>
}

export interface CrudMessages {
  title?: string
  createTitle?: string
  updateTitle?: string
}

export type RenderItemUtils = {
  refreshRecords(): void
  refreshActiveRecord(): void
}

export type RecordTableProps<T> = SimpleTableProps<T> & RenderItemUtils

export type CreateFromProps<T> = Omit<FormProps<Partial<T>>, 'initialValues'> &
  RenderItemUtils

export type UpdateFromProps<T, K> = CreateFromProps<T> & {
  activeRecord: K
} & RenderItemUtils

export interface CrudProps<
  PageItemDto extends Identifiable,
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
  initialFetchParams?: Partial<FetchPageParams>
  renderTable(props: RecordTableProps<PageItemDto>): ReactNode
  renderCreateForm?(props: CreateFromProps<CreateDto>): ReactNode
  renderUpdateForm?(props: UpdateFromProps<UpdateDto, ItemDto>): ReactNode
}
