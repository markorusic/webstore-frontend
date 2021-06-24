import { CategoryList } from '../components/customer/cateogry-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCategories } from '../services/category-service'

export const Categories = () => {
  const categoriesQuery = useCategories()
  return (
    <PageContainer>
      <h1>{locale.commons.categories}</h1>
      <CategoryList
        data={categoriesQuery.data}
        status={categoriesQuery.status}
      />
    </PageContainer>
  )
}
