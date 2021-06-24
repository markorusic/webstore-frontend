import { CategoryList } from '../components/customer/category-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCategories } from '../services/category-service'

export const Categories = () => {
  const categoriesQuery = useCategories()
  return (
    <PageContainer>
      <h1>{locale.categories}</h1>
      <CategoryList
        data={categoriesQuery.data}
        status={categoriesQuery.status}
      />
    </PageContainer>
  )
}
