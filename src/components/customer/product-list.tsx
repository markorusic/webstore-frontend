import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { ProductPageDto } from '../../types/dto'
import { locale } from '../../localization'
import { BaseList, BaseListProps } from '../shared/base-list'
import { ImageCard } from '../shared/image-card'

export interface ProductListItemProps {
  product: ProductPageDto
}

export const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <ImageCard src={product.photo}>
        <Meta
          title={product.name}
          description={`${locale.price}: ${product.price}$`}
        />
      </ImageCard>
    </Link>
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
            <Col key={product.id} xs={24} sm={12} md={8} xl={6}>
              <ProductListItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    />
  )
}
