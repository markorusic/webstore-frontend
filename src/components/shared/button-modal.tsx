import { Button, ButtonProps, ModalProps } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { FC, useState } from 'react'

export interface ButtonModalProps {
  title: string
  buttonProps?: ButtonProps
  modalProps?: ModalProps
}
export const ButtonModal: FC<ButtonModalProps> = ({
  title,
  buttonProps,
  modalProps,
  children
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button {...buttonProps} onClick={() => setShowModal(true)}>
        {title}
      </Button>

      <Modal
        title={title}
        footer={null}
        {...modalProps}
        visible={showModal}
        onCancel={() => setShowModal(false)}
      >
        {children}
      </Modal>
    </>
  )
}
