import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { Page, PageParams, ProductPageDto } from '../types/dto'
import { http } from '../utils/http'

export type ProductFetchParams = PageParams & {
  name?: string
  categoryId?: string
  sort?: 'price,asc' | 'price,desc' | 'name,asc' | 'name,desc'
}

export const productService = {
  async fetchPage(params: ProductFetchParams) {
    const { data } = await http.get<Page<ProductPageDto>>('/products/findAll', {
      params
    })
    return {
      ...data,
      content: data.content.map(product => ({
        ...product,
        photo:
          'https://paisano-online.com/wp-content/uploads/2020/02/File_001-900x733.jpg'
      }))
    } as Page<ProductPageDto>
  }
}

export const productQueryKeys = {
  products: 'products'
}

export const useProductPage = (
  params: ProductFetchParams,
  options?: UseQueryOptions<Page<ProductPageDto>>
) => {
  const key: QueryKey = [productQueryKeys.products, ...Object.values(params)]
  const query = useQuery(key, () => productService.fetchPage({ ...params }), {
    keepPreviousData: true,
    ...options
  })
  return query
}
