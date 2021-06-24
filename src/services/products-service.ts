import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { Page, PageParams, ProductDto, ProductPageDto } from '../types/dto'
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
  },
  async fetchById(id: string | number) {
    const { data } = await http.get<ProductDto>('/products/findById', {
      params: { id }
    })
    return {
      ...data,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      photo:
        'https://paisano-online.com/wp-content/uploads/2020/02/File_001-900x733.jpg',
      photos: Array.from([1, 2, 3, 4]).map(id => ({
        id: id.toString(),
        path: 'https://paisano-online.com/wp-content/uploads/2020/02/File_001-900x733.jpg'
      }))
    } as ProductDto
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
  const query = useQuery(key, () => productService.fetchPage({ ...params }), {
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
