import { Link } from 'react-router-dom'
import { CategoryList } from '../components/customer/category-list'
import { PageContainer } from '../components/customer/page-container'
import { ProductList } from '../components/customer/product-list'
import { locale } from '../localization'
import { useCategories } from '../services/category-service'
import { useProductPage } from '../services/products-service'

export const Home = () => {
  const categoriesQuery = useCategories({
    select: data => data.slice(0, 4)
  })
  const productsQuery = useProductPage({ page: 0, size: 4 })
  return (
    <PageContainer>
      <h1>{locale.home}</h1>

      <div className="py-16">
        <h2>{locale.featuredCategories}</h2>
        <CategoryList
          data={categoriesQuery.data}
          status={categoriesQuery.status}
        />
        <div className="justify-end">
          <Link to="/categories">{locale.showMore}</Link>
        </div>
      </div>

      <div>
        <h2>{locale.featuredProducts}</h2>
        <ProductList
          data={productsQuery.data?.content}
          status={productsQuery.status}
        />
        <div className="justify-end">
          <Link to="/products">{locale.showMore}</Link>
        </div>
      </div>
    </PageContainer>
  )
}
