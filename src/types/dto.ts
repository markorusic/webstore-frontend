export interface Page<T> {
  content: T[]
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    pageSize: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
  }
  totalPages: number
  last: boolean
  totalElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface PageParams {
  page?: number | string
  size?: number | string
}

export interface CategoryDto {
  id: string
  name: string
  photo: string
}

export interface ProductPageDto {
  id: string
  name: string
  price: number
  photo: string
  categoryId: string
}

export interface ProductDto {
  id: string
  name: string
  price: number
  photo: string
  photos: {
    id: string
    path: string
  }[]
  description: string
  category: CategoryDto
}

export interface CustomerDto {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
}

export interface ProductReviewDto {
  id: string
  rate: number
  content: string
  productId: number
  customer: CustomerDto
  updatedAt: string
}
