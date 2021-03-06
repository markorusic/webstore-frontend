import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import {
  Page,
  PageParams,
  ProductDto,
  ProductPageDto,
  ProductRequestDto
} from '../types/dto'
import { http } from '../utils/http'
import { adminHttp } from './admin-service'

export type ProductFetchParams = PageParams & {
  name?: string
  categoryId?: string
  sort?:
    | 'price,asc'
    | 'price,desc'
    | 'name,asc'
    | 'name,desc'
    | 'createdAt,asc'
    | 'createdAt,desc'
}

export const productService = {
  async fetchPage(params: ProductFetchParams) {
    const { data } = await http.get<Page<ProductPageDto>>('/products/findAll', {
      params
    })
    return data
  },
  async fetchById(id: string | number) {
    const { data } = await http.get<ProductDto>('/products/findById', {
      params: { id }
    })
    return data
  },
  async fetchByIds(ids: (string | number)[]) {
    if (ids.length === 0) {
      return [] as ProductDto[]
    }
    const { data } = await http.get<ProductDto[]>('/products/findByIds', {
      params: { ids: ids.join(',') }
    })
    return data
  },
  async create(dto: ProductRequestDto) {
    const { data } = await adminHttp.post<ProductDto>('/products/save', dto)
    return data
  },
  async update(dto: ProductRequestDto) {
    const { data } = await adminHttp.put<ProductDto>('/products/update', dto)
    return data
  }
}

export const productQueryKeys = {
  products: 'products',
  product: 'product'
}

export const useProductPage = (
  params: ProductFetchParams,
  options?: UseQueryOptions<Page<ProductPageDto>>
) => {
  const key: QueryKey = [productQueryKeys.products, ...Object.values(params)]
  const query = useQuery(key, () => productService.fetchPage(params), {
    keepPreviousData: true,
    ...options
  })
  return query
}

export const useProduct = (
  id: string | number,
  options?: UseQueryOptions<ProductDto>
) => {
  const key: QueryKey = [productQueryKeys.product, id]
  const query = useQuery(key, () => productService.fetchById(id), {
    keepPreviousData: true,
    ...options
  })
  return query
}
