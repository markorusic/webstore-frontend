import { useQuery, UseQueryOptions } from 'react-query'
import { Page, CategoryDto, PageParams } from '../types/dto'
import { http } from '../utils/http'

export const categoryService = {
  async fetchPage(params: PageParams) {
    const { data } = await http.get<Page<CategoryDto>>('/categories/findAll', {
      params
    })
    return {
      ...data,
      content: data.content.map(category => ({
        ...category,
        photo:
          Math.random() > 0.5
            ? 'http://vuzz-backend.novafabrika.rs/upload/content/images/1608207957973-870264a5-2aa1-4418-8947-ca89164ad809.jpg'
            : 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg'
      }))
    } as Page<CategoryDto>
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
