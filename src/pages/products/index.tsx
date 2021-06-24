import { useParams } from 'react-router-dom'
import { PageContainer } from '../../components/customer/page-container'
import {
  ProductFetchParams,
  productService,
  useProductPage
} from '../../services/products-service'
import { Page, ProductPageDto } from '../../types/dto'

// interface Props {
//   initialProductsPage: Page<ProductPageDto>
// }

// export const getServerSideProps: GetServerSideProps<Props> = async context => {
//   const initialProductsPage = await productService.fetchPage(context.query)
//   return {
//     props: {
//       initialProductsPage
//     }
//   }
// }

export const Products = () => {
  const params = useParams()
  // const params = router.query as ProductFetchParams
  // const productsPageQuery = useProductPage(params, {
  //   initialData: {
  //     pageParams: [params],
  //     pages: [initialProductsPage]
  //   }
  // })

  // console.log({
  //   params,
  //   // productsPageQuery,
  //   initialProductsPage
  // })

  return (
    <PageContainer>
      <div>Products</div>
    </PageContainer>
  )
}
