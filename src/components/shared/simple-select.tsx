import React, { FC } from 'react'
import { Select, SelectProps } from 'antd'

export interface SimpleSelectProps extends Omit<SelectProps<any>, 'onChange'> {
  items:
    | {
        title: string
        value: string
      }[]
    | undefined
  label?: string
  onChange(value: string): void
}

export const SimpleSelect: FC<SimpleSelectProps> = ({
  items,
  label,
  defaultValue,
  ...props
}) => {
  return (
    <div>
      {label && (
        <div className="py-4">
          <label
            className="cursor-pointer"
            // @ts-ignore
            style={{ fontSize: '16px', fontWeight: '500' }}
            htmlFor={props.id}
          >
            {label}
          </label>
        </div>
      )}
      <Select
        showSearch
        allowClear
        labelInValue
        style={{ width: 200 }}
        optionFilterProp="title"
        defaultValue={defaultValue ? { value: defaultValue } : undefined}
        filterOption={(input, option) =>
          option?.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
        onChange={data => {
          // @ts-ignore
          props.onChange(data?.value.toString())
        }}
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
