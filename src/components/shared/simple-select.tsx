import React, { FC } from 'react'
import { Select, SelectProps } from 'antd'

export interface SimpleSelectProps extends SelectProps<any> {
  items:
    | {
        title: string
        value: string
      }[]
    | undefined
  label?: string
}

export const SimpleSelect: FC<SimpleSelectProps> = ({
  items,
  label,
  ...props
}) => {
  return (
    <div>
      {label && (
        <div>
          <label className="cursor-pointer" htmlFor={props.id}>
            {label}
          </label>
        </div>
      )}
      <Select
        showSearch
        allowClear
        style={{ width: 200 }}
        optionFilterProp="title"
        filterOption={(input, option) =>
          option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
      >
        {items?.map(item => (
          <Select.Option
            className="cursor-pointer"
            key={item.value}
            value={item.value.toString()}
            title={item.title}
          >
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}
