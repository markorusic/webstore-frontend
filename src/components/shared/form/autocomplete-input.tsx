import React, { FC } from 'react'
import get from 'lodash/get'
import { useField } from 'formik'
import { useAsync } from 'react-use'
import { Select, Alert, SelectProps } from 'antd'
import { SelectValue } from 'antd/lib/select'
import { SearchOutlined } from '@ant-design/icons'
import { BaseInputProps, FormInputContainer } from './index'
import { Spin } from '../spin'

type Props = SelectProps<SelectValue> &
  BaseInputProps & {
    fetchData(): Promise<any>
    fetchDataDependencies?: any[]
    displayProperty: string
    valueProperty: string
    fullObject?: boolean
  }

export const AutocompleteInput: FC<Props> = ({
  name,
  label = '',
  fetchData,
  fetchDataDependencies = [],
  displayProperty,
  valueProperty,
  fullObject = false,
  ...props
}) => {
  const items = useAsync(fetchData, fetchDataDependencies)
  const [{ value: fieldValue, onBlur }, , helpers] = useField(name)
  const value = fullObject ? get(fieldValue, valueProperty) : fieldValue

  return (
    <FormInputContainer name={name} label={label}>
      <Spin spinning={items.loading}>
        {items.error && <Alert message="Loading error" type="error" showIcon />}
        {items.value && (
          <Select
            showSearch
            suffixIcon={<SearchOutlined />}
            style={{ width: 200 }}
            optionFilterProp="children"
            getPopupContainer={trigger => trigger.parentElement}
            defaultValue={value}
            onBlur={onBlur}
            {...props}
            value={
              items.value.find((item: any) => item[valueProperty] === value)
                ? value
                : null
            }
            onChange={value => {
              if (fullObject) {
                const _value = items.value.find(
                  (item: any) => item[valueProperty] === value
                )
                if (_value) {
                  helpers.setValue(_value)
                }
              } else {
                helpers.setValue(value)
              }
            }}
            filterOption={(input, option) =>
              option?.props.children
                .toString()
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {items.value.map((item: any) => {
              const value = get(item, valueProperty)
              const displayValue = get(item, displayProperty)

              return (
                <Select.Option key={value} value={value}>
                  {displayValue}
                </Select.Option>
              )
            })}
          </Select>
        )}
      </Spin>
    </FormInputContainer>
  )
}
