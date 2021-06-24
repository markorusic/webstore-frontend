import { Col, Row } from 'antd'
import React from 'react'
import { PageContainer } from '../../components/customer/page-container'
import { ProductList } from '../../components/customer/product-list'
import { BaseList } from '../../components/shared/base-list'
import { SimpleSelect } from '../../components/shared/simple-select'
import { locale } from '../../localization'
import { useCategories } from '../../services/category-service'
import {
  ProductFetchParams,
  useProductPage
} from '../../services/products-service'
import { useURLQuery } from '../../utils/use-url-query'

export const Products = () => {
  const { params, setParam } = useURLQuery<ProductFetchParams>()
  const categoriesQuery = useCategories()
  const productsPageQuery = useProductPage({
    page: 0,
    size: 12,
    ...params
  })

  return (
    <PageContainer>
      <h1>{locale.products}</h1>

      <Row justify="space-between">
        <Col>
          <BaseList
            data={categoriesQuery.data}
            status={categoriesQuery.status}
            renderItems={categories => (
              <SimpleSelect
                id="category-select"
                label={locale.selectCategory}
                placeholder={locale.searchForCategory}
                defaultValue={params.categoryId?.toString()}
                items={categories.map(category => ({
                  title: category.name,
                  value: category.id
                }))}
                onChange={cateogryId => {
                  setParam('categoryId', cateogryId)
                }}
              />
            )}
          />
        </Col>

        <Col>
          <SimpleSelect
            id="sort-select"
            label={locale.selectSort}
            placeholder={locale.selectSort}
            defaultValue={params.sort}
            items={[
              { title: 'Price desc', value: 'price,desc' },
              { title: 'Price asc', value: 'price,asc' },
              { title: 'Name desc', value: 'name,desc' },
              { title: 'Name asc', value: 'name,asc' }
            ]}
            onChange={sort => {
              setParam('sort', sort)
            }}
          />
        </Col>
      </Row>

      <div className="pt-16">
        <ProductList
          data={productsPageQuery.data?.pages[params.page || 0]?.content}
          status={productsPageQuery.status}
        />
      </div>
    </PageContainer>
  )
}
