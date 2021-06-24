import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import { CategoryDto } from '../../types/dto'
import { BaseList, BaseListProps } from '../shared/base-list'
import { ImageCard } from '../shared/image-card'
import Meta from 'antd/lib/card/Meta'

export interface CategoryListItemProps {
  category: CategoryDto
}

export const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  return (
    <Link to={`/products?categoryId=${category.id}`}>
      <ImageCard src={category.photo}>
        <Meta title={category.name} />
      </ImageCard>
    </Link>
  )
}

export type CategoryListProps = Omit<BaseListProps<CategoryDto>, 'renderItems'>

export const CategoryList: FC<CategoryListProps> = props => {
  return (
    <BaseList
      {...props}
      renderItems={categories => (
        <Row gutter={[16, 16]}>
          {categories.map(category => (
            <Col key={category.id} xs={24} sm={12} md={6}>
              <CategoryListItem category={category} />
            </Col>
          ))}
        </Row>
      )}
    />
  )
}
