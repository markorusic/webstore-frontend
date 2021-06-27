import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import {
  Page,
  PageParams,
  ProductReviewDto,
  ProductReviewRequestDto
} from '../types/dto'
import { http } from '../utils/http'
import { adminHttp } from './admin-service'
import { customerHttp } from './customer-service'

export type ProductReviewFetchParams = PageParams & {
  id: string | number
  sort?: 'rate,asc' | 'rate,desc' | 'updatedAt,asc' | 'updatedAt,desc'
}

export const productReviewService = {
  async fetchPageByProductId(params: ProductReviewFetchParams) {
    const { data } = await http.get<Page<ProductReviewDto>>(
      '/product-reviews/product/findById',
      {
        params
      }
    )
    return data
  },
  async me() {
    const { data } = await customerHttp.get<ProductReviewDto[]>(
      '/product-reviews/me'
    )
    return data
  },
  async fetchPage(params: Omit<ProductReviewFetchParams, 'id'>) {
    const { data } = await adminHttp.get<Page<ProductReviewDto>>(
      '/product-reviews/findAll',
      {
        params
      }
    )
    return data
  },
  async save(dto: ProductReviewRequestDto) {
    const { data } = await customerHttp.post<ProductReviewDto>(
      '/product-reviews/save',
      dto
    )
    return data
  },
  async update(dto: ProductReviewRequestDto) {
    const { data } = await customerHttp.put<ProductReviewDto>(
      '/product-reviews/update',
      dto
    )
    return data
  }
}

export const productReviewQueryKeys = {
  productReviews: 'productReviews',
  customerRroductReviews: 'customerRroductReviews'
}

export const useProductReviewPage = (
  params: ProductReviewFetchParams,
  options?: UseQueryOptions<Page<ProductReviewDto>>
) => {
  const key: QueryKey = [
    productReviewQueryKeys.productReviews,
    ...Object.values(params)
  ]
  const query = useQuery(
    key,
    () => productReviewService.fetchPageByProductId(params),
    {
      keepPreviousData: true,
      ...options
    }
  )
  return query
}

export const useCustomerProductReviews = () =>
  useQuery(
    productReviewQueryKeys.customerRroductReviews,
    productReviewService.me,
    { keepPreviousData: true }
  )
