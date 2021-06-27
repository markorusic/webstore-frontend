import React from 'react'
import { categoryService } from '../../../services/category-service'
import Crud from '../../shared/crud'
import { PageContainer } from '../page-container'
import { CategoryCreateForm } from './category-create-form'
import { CategoryTable } from './category-table'
import { CategoryUpdateForm } from './category-update-form'

export const Categories = () => {
  return (
    <PageContainer>
      <Crud
        id="admin-categories"
        entityService={categoryService}
        messages={{
          title: 'Categories',
          createTitle: 'Create category',
          updateTitle: 'Update category'
        }}
        initialFetchParams={{ sort: 'id,desc', size: 5 }}
        renderTable={props => <CategoryTable {...props} />}
        renderCreateForm={props => <CategoryCreateForm {...props} />}
        renderUpdateForm={props => <CategoryUpdateForm {...props} />}
      />
    </PageContainer>
  )
}
