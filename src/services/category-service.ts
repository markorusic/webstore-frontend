import { useQuery, UseQueryOptions } from 'react-query'
import { Page, CategoryDto, PageParams, CategoryRequestDto } from '../types/dto'
import { http } from '../utils/http'
import { adminHttp } from './admin-service'

export const categoryService = {
  async fetchPage(params: PageParams & { sort?: 'id,desc' }) {
    const { data } = await http.get<Page<CategoryDto>>('/categories/findAll', {
      params
    })
    return data
  },
  async fetchById(id: string | number) {
    const { data } = await http.get<CategoryDto>('/categories/findById', {
      params: { id }
    })
    return data
  },
  async create(dto: CategoryRequestDto) {
    const { data } = await adminHttp.post<CategoryDto>('/categories/save', dto)
    return data
  },
  async update(dto: CategoryRequestDto) {
    const { data } = await adminHttp.put<CategoryDto>('/categories/update', dto)
    return data
  }
}

export const categoryQueryKeys = {
  categories: 'categories'
}

export const useCategories = (options?: UseQueryOptions<CategoryDto[]>) =>
  useQuery(
    categoryQueryKeys.categories,
    async () => {
      const page = await categoryService.fetchPage({
        size: 100,
        sort: 'id,desc'
      })
      return page.content
    },
    options
  )
