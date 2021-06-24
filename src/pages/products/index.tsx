import { PageContainer } from '../../components/customer/page-container'
import { ProductList } from '../../components/customer/product-list'
import { locale } from '../../localization'
import {
  ProductFetchParams,
  useProductPage
} from '../../services/products-service'
import { useURLQuery } from '../../utils/use-url-query'

export const Products = () => {
  const { params, setParam } = useURLQuery<ProductFetchParams>({
    page: 0,
    size: 10
  })
  const productsPageQuery = useProductPage(params)

  return (
    <PageContainer>
      <div>{locale.commons.products}</div>

      <ProductList
        data={productsPageQuery.data?.pages[params.page || 0]?.content}
        status={productsPageQuery.status}
      />
    </PageContainer>
  )
}
