import React from 'react'
import { productService } from '../../../services/products-service'
import Crud from '../../shared/crud'
import { SimpleTable } from '../../simple-table'
import { PageContainer } from '../page-container'

export const Products = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-products"
        entityService={{
          fetchPage: productService.fetchPage,
          findById: productService.fetchById,
          create: (dto: any) => Promise.resolve({} as any),
          update: (dto: any) => Promise.resolve({} as any)
        }}
        renderTable={tableProps => (
          <SimpleTable
            {...tableProps}
            columns={[
              {
                name: 'name',
                title: 'Name',
                sorter: true,
                filters: [
                  { text: 'Male', value: 'male' },
                  { text: 'Female', value: 'female' }
                ]
              }
            ]}
          />
        )}
      />
    </PageContainer>
  )
}
