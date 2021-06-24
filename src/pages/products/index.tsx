import React from 'react'
import { Col, Pagination, Row } from 'antd'
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
import { paginationAdapter } from '../../utils/pagination-adapter'
import { useURLQuery } from '../../utils/use-url-query'

export const Products = () => {
  const urlQuery = useURLQuery<ProductFetchParams>()
  const categoriesQuery = useCategories()
  const productsPageQuery = useProductPage({
    page: 0,
    size: 12,
    ...urlQuery.params
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
                defaultValue={urlQuery.params.categoryId?.toString()}
                onChange={categoryId =>
                  urlQuery.setParams({
                    categoryId,
                    page: 0
                  })
                }
                items={categories.map(category => ({
                  title: category.name,
                  value: category.id
                }))}
              />
            )}
          />
        </Col>

        <Col>
          <SimpleSelect
            id="sort-select"
            label={locale.selectSort}
            placeholder={locale.selectSort}
            defaultValue={urlQuery.params.sort}
            onChange={value => urlQuery.setParam('sort', value)}
            items={[
              { title: 'Price Descending ', value: 'price,desc' },
              { title: 'Price Ascending ', value: 'price,asc' },
              { title: 'Name Descending ', value: 'name,desc' },
              { title: 'Name Ascending ', value: 'name,asc' }
            ]}
          />
        </Col>
      </Row>

      <div className="py-16">
        <ProductList
          data={productsPageQuery.data?.content}
          status={productsPageQuery.status}
        />
      </div>

      <Pagination
        {...paginationAdapter({
          pageSize: urlQuery.params.size,
          current: urlQuery.params.page,
          total: productsPageQuery.data?.totalElements,
          onChange: page => urlQuery.setParam('page', page)
        })}
      />
    </PageContainer>
  )
}
