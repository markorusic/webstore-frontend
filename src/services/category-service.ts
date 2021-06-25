import { useQuery, UseQueryOptions } from 'react-query'
import { Page, CategoryDto, PageParams } from '../types/dto'
import { http } from '../utils/http'

export const categoryService = {
  async fetchPage(params: PageParams) {
    const { data } = await http.get<Page<CategoryDto>>('/categories/findAll', {
      params
    })
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
      const page = await categoryService.fetchPage({ size: 100 })
      return page.content
    },
    options
  )
