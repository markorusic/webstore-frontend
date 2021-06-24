import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CateogryList } from '../components/customer/cateogry-list'
import { PageContainer } from '../components/customer/page-container'
import { locale } from '../localization'
import { categoryService } from '../services/category-service'

export const Home = () => {
  const categoriesQuery = useQuery('categories', () =>
    categoryService.fetchPage({ size: 4 })
  )
  return (
    <PageContainer>
      <h1>{locale.commons.home}</h1>
      <CateogryList
        categories={
          categoriesQuery.status === 'success'
            ? categoriesQuery.data.content
            : []
        }
      />

      <div className="justify-end">
        <Link to="/categories">{locale.commons.showMore}</Link>
      </div>
    </PageContainer>
  )
}
