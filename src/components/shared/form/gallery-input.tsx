import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { notification, Upload, UploadProps } from 'antd'
import { useField } from 'formik'
import { BaseInputProps, FormInputContainer } from '.'
import { uploadFile } from './photo-input'

type GalleryInputProps = UploadProps & BaseInputProps

export const GalleryInput = ({ name, label, ...props }: GalleryInputProps) => {
  const [field, , helpers] = useField<string[]>(name)
  const [loading, setLoading] = useState(false)
  return (
    <FormInputContainer name={name} label={label}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        onRemove={removed => {
          const filteredPaths = field.value.filter(path => removed.url !== path)
          helpers.setValue(filteredPaths)
        }}
        fileList={field.value.map((url, index) => ({
          url,
          uid: url + index,
          name: `Photo ${index}`,
          status: 'done'
        }))}
        customRequest={async ({ file }) => {
          try {
            setLoading(true)
            const path = await uploadFile(file)
            helpers.setValue([...field.value, path])
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
