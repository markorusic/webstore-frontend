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
  create(dto: CreateDto): Promise<ItemDto>
  update(dto: UpdateDto): Promise<ItemDto>
  fetchById(id: ID): Promise<ItemDto>
}

export interface CrudMessages {
  title: string
  createTitle: string
  updateTitle: string
}

export type CreateFromProps<T> = Omit<FormProps<Partial<T>>, 'initialValues'>

export type UpdateFromProps<T, K> = CreateFromProps<T> & { activeRecord: K }

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
  renderTable(props: SimpleTableProps<PageItemDto>): ReactNode
  renderCreateForm?(props: CreateFromProps<CreateDto>): ReactNode
  renderUpdateForm?(props: UpdateFromProps<UpdateDto, ItemDto>): ReactNode
}
