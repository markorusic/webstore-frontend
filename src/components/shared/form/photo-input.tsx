import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { notification, Upload, UploadProps } from 'antd'
import { useField } from 'formik'
import { BaseInputProps, FormInputContainer } from '.'
import { adminHttp } from '../../../services/admin-service'

type PhotoInputProps = UploadProps & BaseInputProps

export const PhotoInput = ({ name, label, ...props }: PhotoInputProps) => {
  const [field, , helpers] = useField(name)
  const [loading, setLoading] = useState(false)
  return (
    <FormInputContainer name={name} label={label}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={async ({ file }) => {
          try {
            const formData = new FormData()
            formData.append('file', file)
            setLoading(true)
            const {data} = await adminHttp.post<string>(
              '/file-upload',
              formData,
              {
                headers: {
                  'Content-type': 'multipart/form-data'
                }
              }
            )
            helpers.setValue(data)
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
        {field.value ? (
          <div>
            <img
              alt=""
              src={field.value}
              style={{
                width: '100%',
                height: 'auto',
                overflow: 'hidden',
                objectFit: 'contain'
              }}
            />
          </div>
        ) : (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </FormInputContainer>
  )
}
