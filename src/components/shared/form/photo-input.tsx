import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { notification, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { useField } from 'formik'
import { BaseInputProps, FormInputContainer } from '.'
import { adminHttp } from '../../../services/admin-service'

export const uploadFile = (file: Blob | string | RcFile) => {
  const formData = new FormData()
  formData.append('file', file)
  return adminHttp
    .post<string>('/file-upload', formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    .then(response => response.data)
}

type PhotoInputProps = UploadProps & BaseInputProps

export const PhotoInput = ({ name, label, ...props }: PhotoInputProps) => {
  const [field, , helpers] = useField<string | undefined>(name)
  const [loading, setLoading] = useState(false)
  return (
    <FormInputContainer name={name} label={label}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        maxCount={1}
        onRemove={() => helpers.setValue(undefined)}
        fileList={
          field.value
            ? [
                {
                  uid: field.value,
                  url: field.value,
                  name: 'stagod',
                  status: 'done'
                }
              ]
            : []
        }
        customRequest={async ({ file }) => {
          try {
            setLoading(true)
            const path = await uploadFile(file)
            helpers.setValue(path)
            notification.success({ message: 'Successfully uploaded!' })
          } catch (err) {
            notification.error({
              message: err?.response?.data?.message ?? 'An error occured!'
            })
          } finally {
            setLoading(false)
          }
        }}
        {...props}
      >
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </FormInputContainer>
  )
}
