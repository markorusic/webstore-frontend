import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions
} from 'react-query'
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
        photo: 'https://picsum.photos/200/300'
      }))
    } as Page<ProductPageDto>
  }
}

export const productQueryKeys = {
  products: 'products'
}

export const useProductPage = (
  params: ProductFetchParams,
  options?: UseInfiniteQueryOptions<Page<ProductPageDto>>
) => {
  //   const key: QueryKey = [productQueryKeys.products, ...Object.values(params)]
  const query = useInfiniteQuery(
    productQueryKeys.products,
    ({ pageParam = 0 }) =>
      productService.fetchPage({ ...params, page: pageParam }),
    {
      getNextPageParam: lastPage =>
        lastPage.last ? undefined : lastPage.pageable.pageNumber + 1,
      keepPreviousData: true,
      ...options
    }
  )

  return query
}
