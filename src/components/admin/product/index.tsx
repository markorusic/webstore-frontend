import { Tabs } from 'antd'
import React from 'react'
import { productService } from '../../../services/products-service'
import Crud from '../../shared/crud'
import { PageContainer } from '../page-container'
import { ProductCreateForm } from './product-create-form'
import { ProductReviewTable } from './product-review-table'
import { ProductTable } from './product-table'
import { ProductUpdateForm } from './product-update-form'

export const Products = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-products"
        entityService={productService}
        messages={{
          title: 'Products',
          createTitle: 'Create product',
          updateTitle: 'Update product'
        }}
        initialFetchParams={{ sort: 'createdAt,desc', size: 5 }}
        renderTable={props => <ProductTable {...props} />}
        renderCreateForm={props => <ProductCreateForm {...props} />}
        renderUpdateForm={props => (
          <Tabs>
            <Tabs.TabPane tab="Product details" key="details">
              <ProductUpdateForm {...props} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Product reviews" key="reviews">
              <ProductReviewTable productId={props.activeRecord.id} />
            </Tabs.TabPane>
          </Tabs>
        )}
      />
    </PageContainer>
  )
}
