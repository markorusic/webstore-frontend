import React, { cloneElement, FC, ReactElement, useRef } from 'react'
import { v4 as uniqueId } from 'uuid'
import {
  useFormikContext,
  useField,
  FormikConfig,
  Formik,
  Form as FormikFrom
} from 'formik'
import { Button, ButtonProps, Input, InputProps } from 'antd'
import { TextAreaProps as BaseTextAreaProps } from 'antd/lib/input'

export function Form<T>({ children, ...props }: FormikConfig<T>) {
  return (
    <Formik {...props}>
      {formikProps => (
        <FormikFrom
          onSubmit={event => {
            event.preventDefault()
            event.stopPropagation()
            if (!formikProps.isSubmitting) {
              formikProps.handleSubmit(event)
            }
          }}
        >
          {typeof children === 'function' ? children(formikProps) : children}
        </FormikFrom>
      )}
    </Formik>
  )
}

export interface BaseInputProps {
  name: string
  label?: string
  containerClassName?: string
}

export const FormInputContainer: FC<BaseInputProps> = ({
  name,
  label = '',
  containerClassName = 'mb-2',
  children
}) => {
  const [, meta] = useField(name)
  const { current: id } = useRef(`${uniqueId()}_${name}`)
  return (
    <div className={containerClassName}>
      <div>
        <label className="font-bold" htmlFor={id}>
          {label}
        </label>
      </div>
      <div>{cloneElement(children as ReactElement, { id })}</div>
      {meta.touched && meta.error ? (
        <div>
          {/* TODO: this is hacky solution, consider something more agile and customisable */}
          <span className="danger-text">{meta.error.replace(name, label)}</span>
        </div>
      ) : null}
    </div>
  )
}

export const SubmitButton: FC<ButtonProps> = props => {
  const form = useFormikContext()
  return (
    <Button {...props} htmlType="submit" loading={form.isSubmitting}>
      {props.children ?? 'Submit'}
    </Button>
  )
}

export type TextInputProps = BaseInputProps & InputProps
export const TextInput: FC<TextInputProps> = ({
  containerClassName,
  ...props
}) => {
  const [field] = useField(props.name)
  return (
    <FormInputContainer containerClassName={containerClassName} {...props}>
      <Input {...field} {...props} />
    </FormInputContainer>
  )
}

export type TextAreaProps = BaseInputProps & BaseTextAreaProps
export const TextAreaInput: FC<TextAreaProps> = ({
  containerClassName,
  ...props
}) => {
  const [field] = useField(props.name)
  return (
    <FormInputContainer containerClassName={containerClassName} {...props}>
      <Input.TextArea {...field} {...props} />
    </FormInputContainer>
  )
}
