import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { Page, PageParams, ProductReviewDto } from '../types/dto'
import { http } from '../utils/http'

export type ProductReviewFetchParams = PageParams & {
  id: string | number
  sort?: 'rate,asc' | 'rate,desc' | 'updatedAt,asc' | 'updatedAt,desc'
}

export const productReviewService = {
  async fetchPage(params: ProductReviewFetchParams) {
    const { data } = await http.get<Page<ProductReviewDto>>(
      '/product-reviews/product/findById',
      {
        params
      }
    )
    return {
      ...data,
      content: Array.from(new Array(params.size)).map((_, id) => ({
        ...data.content[0],
        customer: {
          ...data.content[0].customer,
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        },
        rate: Math.floor(Math.random() * 10),
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: id.toString()
      }))
    } as Page<ProductReviewDto>
  }
}

export const productReviewQueryKeys = {
  productReviews: 'productReviews'
}

export const useProductReviewPage = (
  params: ProductReviewFetchParams,
  options?: UseQueryOptions<Page<ProductReviewDto>>
) => {
  const key: QueryKey = [
    productReviewQueryKeys.productReviews,
    ...Object.values(params)
  ]
  const query = useQuery(key, () => productReviewService.fetchPage(params), {
    keepPreviousData: true,
    ...options
  })
  return query
}
