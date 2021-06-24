import React, { FC } from 'react'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { ProductPageDto } from '../../types/dto'
import { locale } from '../../localization'
import { BaseList, BaseListProps } from '../shared/base-list'

export interface ProductListItemProps {
  product: ProductPageDto
}

export const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  return (
    <Card hoverable cover={<img alt={product.name} src={product.photo} />}>
      <Meta
        title={product.name}
        description={`${locale.commons.price}: ${product.price}$`}
      />
    </Card>
  )
}

export type ProductListProps = Omit<
  BaseListProps<ProductPageDto>,
  'renderItems'
>

export const ProductList: FC<ProductListProps> = props => {
  return (
    <BaseList
      {...props}
      renderItems={products => (
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col key={product.id} xs={24} sm={12} md={6}>
              <ProductListItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    />
  )
}
