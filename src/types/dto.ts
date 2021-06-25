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
}

export interface ProductReviewDto {
  id: string
  rate: number
  content: string
  productId: number
  customer: CustomerDto
  updatedAt: string
}

export interface CustomerRegisterRequestDto {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface CustomerLoginRequestDto {
  email: string
  password: string
}

export interface CustomerLoginResponseDto {
  token: string
  user: CustomerDto
}

export interface UserLogAction {
  id: string
  actionType: string
  createdAt: string
}

export interface OrderRequestDto {
  shippingAddress: string
  note: string
  orderDetails: {
    quantity: number
    productId: string
  }[]
}
export interface OrderDto {
  id: number
  shippingAddress: string
  note: string
  status: string
  customer: CustomerDto
  orderDetails: {
    id: number
    name: string
    price: number
    photo: string
    quantity: number
    productId: number
  }[]
}
