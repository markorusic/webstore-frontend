import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { CategoryDto } from '../../types/dto'
import { Link } from 'react-router-dom'
import { BaseList, BaseListProps } from '../shared/base-list'

export interface CategoryListItemProps {
  category: CategoryDto
}

export const CategoryListItem: FC<CategoryListItemProps> = ({ category }) => {
  return (
    <Link to={`/products?categoryId=${category.id}`}>
      <Card hoverable cover={<img alt={category.name} src={category.photo} />}>
        <Meta title={category.name} />
      </Card>
    </Link>
  )
}

// export interface CateogryListProps {
//   categories: CategoryDto[]
// }

// export const CateogryList: FC<CateogryListProps> = ({ categories }) => {
//   return (
//     <Row gutter={[16, 16]}>
//       {categories.map(category => (
//         <Col key={category.id} xs={24} sm={12} md={6}>
//           <CategoryListItem category={category} />
//         </Col>
//       ))}
//     </Row>
//   )
// }
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
