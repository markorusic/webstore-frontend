import React, { FC } from 'react'
import { Row, Col, Button, PageHeader } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export interface CrudLayoutProps {
  title: string
  showActiveRecord: boolean
  onRefresh?(): void
  refreshing?: boolean
  topRowElement?: React.ReactNode
  mainElement?: React.ReactNode
  activeItemElement?: React.ReactNode
}

export const CrudLayout: FC<CrudLayoutProps> = ({
  title,
  showActiveRecord,
  onRefresh = null,
  refreshing = false,
  topRowElement = null,
  mainElement = null,
  activeItemElement = null
}) => {
  return (
    <div>
      <PageHeader
        style={{ padding: '0 8px 10px 8px' }}
        title={title}
        onBack={window.history.back}
      />
      <Row justify="space-between">
        <Col className="content-box" xl={showActiveRecord ? 13 : 24} xs={24}>
          <Row className="mb-10" justify="space-between" align="middle">
            <Row className="mb-10" justify="start" align="middle">
              {topRowElement}
            </Row>
            {onRefresh && (
              <Button
                className="mr-5"
                icon={<ReloadOutlined />}
                shape="circle"
                onClick={() => onRefresh()}
                loading={refreshing}
              />
            )}
          </Row>
          <Row>
            <Col span={24}>{mainElement}</Col>
          </Row>
        </Col>
        <Col xl={11} lg={24}>
          {showActiveRecord && (
            <div className="active-item-container">{activeItemElement}</div>
          )}
        </Col>
      </Row>
    </div>
  )
}
