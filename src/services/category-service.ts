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
        photo: 'https://picsum.photos/200/300'
      }))
    }
  }
}
