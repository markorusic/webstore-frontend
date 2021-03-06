import React from 'react'
import { Pagination } from 'antd'
import { PageContainer } from '../../components/customer/page-container'
import { ProductList } from '../../components/customer/product-list'
import { AsyncList } from '../../components/shared/async-list'
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
  const urlQuery = useURLQuery<ProductFetchParams>({ sort: 'createdAt,desc' })
  const categoriesQuery = useCategories()
  const productsPageQuery = useProductPage({
    page: 0,
    size: 8,
    ...urlQuery.params
  })

  return (
    <PageContainer>
      <h1>{locale.products}</h1>
      <div className="space-between">
        <AsyncList
          data={categoriesQuery.data}
          status={categoriesQuery.status}
          render={categories => (
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

        <SimpleSelect
          id="sort-select"
          label={locale.selectSort}
          placeholder={locale.selectSort}
          defaultValue={urlQuery.params.sort}
          onChange={value => urlQuery.setParam('sort', value)}
          items={[
            { title: 'Latest ', value: 'createdAt,desc' },
            { title: 'Oldest ', value: 'createdAt,asc' },
            { title: 'Price Descending ', value: 'price,desc' },
            { title: 'Price Ascending ', value: 'price,asc' },
            { title: 'Name Descending ', value: 'name,desc' },
            { title: 'Name Ascending ', value: 'name,asc' }
          ]}
        />
      </div>

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
