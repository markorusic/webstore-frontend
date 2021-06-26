import { Button, ButtonProps, ModalProps } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

export interface ButtonModalProps {
  title: string
  buttonProps?: ButtonProps
  modalProps?: ModalProps
  children:
    | ReactNode
    | ((injectedProps: {
        setShowModal: Dispatch<SetStateAction<boolean>>
      }) => ReactNode)
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
        {/* @ts-ignore */}
        {typeof children === 'function' ? children({ setShowModal }) : children}
      </Modal>
    </>
  )
}
