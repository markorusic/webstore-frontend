import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { CategoryDto } from '../../types/dto'
import { AsyncList, AsyncListProps } from '../shared/async-list'
import { ImageCard } from '../shared/image-card'

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

export type CategoryListProps = Omit<AsyncListProps<CategoryDto>, 'render'>

export const CategoryList: FC<CategoryListProps> = props => {
  return (
    <AsyncList
      {...props}
      render={categories => (
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
