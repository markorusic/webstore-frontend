import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { CategoryDto } from '../../types/dto'

export interface CategoryListItemProps {
  category: CategoryDto
}

export const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  return (
    <Card hoverable cover={<img alt={category.name} src={category.photo} />}>
      <Meta title={category.name} />
    </Card>
  )
}

export interface CateogryListProps {
  categories: CategoryDto[]
}

export const CateogryList: FC<CateogryListProps> = ({ categories }) => {
  return (
    <Row gutter={[16, 16]}>
      {categories.map(category => (
        <Col key={category.id} xs={24} sm={12} md={6}>
          <CategoryListItem category={category} />
        </Col>
      ))}
    </Row>
  )
}
