import { useQuery } from 'react-query'
import { CateogryList } from '../components/customer/cateogry-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { categoryService } from '../services/category-service'

export const Categories = () => {
  const categoriesQuery = useQuery('categories', () =>
    categoryService.fetchPage({ size: 100 })
  )
  return (
    <PageContainer>
      <h1>{locale.commons.categories}</h1>
      <CateogryList
        categories={
          categoriesQuery.status === 'success'
            ? categoriesQuery.data.content
            : []
        }
      />
    </PageContainer>
  )
}
