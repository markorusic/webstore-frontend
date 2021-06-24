import { Link } from 'react-router-dom'
import { CategoryList } from '../components/customer/cateogry-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { useCategories } from '../services/category-service'

export const Home = () => {
  const categoriesQuery = useCategories({
    select: data => data.slice(0, 4)
  })
  return (
    <PageContainer>
      <h1>{locale.home}</h1>

      <CategoryList
        data={categoriesQuery.data}
        status={categoriesQuery.status}
      />

      <div className="justify-end">
        <Link to="/categories">{locale.showMore}</Link>
      </div>
    </PageContainer>
  )
}
