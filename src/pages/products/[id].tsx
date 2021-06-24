import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Image, Row } from 'antd'
import { PageContainer } from '../../components/customer/page-container'
import { AsyncContainer } from '../../components/shared/async-container'
import { useProduct } from '../../services/products-service'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { locale } from '../../localization'

export const Product = () => {
  const { id } = useParams<{ id: string }>()
  const productQuery = useProduct(id)

  return (
    <PageContainer>
      <AsyncContainer
        data={productQuery.data}
        status={productQuery.status}
        render={product => (
          <>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12}>
                <div>
                  <Image width={400} src={product.photo} />
                </div>
                <div className="py-8">
                  <Row gutter={[4, 4]}>
                    {product.photos.map(photo => (
                      <Col key={photo.id}>
                        <Image width={100} src={photo.path} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>

              <Col xs={24} sm={12}>
                <h1>{product.name}</h1>
                <Link to={`/products?categoryId=${product.category.id}`}>
                  <h3 className="color-secondary">{product.category.name}</h3>
                </Link>
                <p className="py-16">{product.description}</p>
                <div className="py-16">
                  <Button size="large" icon={<ShoppingCartOutlined />}>
                    {locale.addToCart}
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      />
    </PageContainer>
  )
}
