import React, { FC, useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { Button, ButtonProps, notification } from 'antd'

export interface AsyncButtonProps extends ButtonProps {
  asyncFn(): Promise<any>
}

export const AsyncButton: FC<AsyncButtonProps> = ({ asyncFn, ...props }) => {
  const [state, fn] = useAsyncFn(asyncFn)

  useEffect(() => {
    if (state.error) {
      notification.open({
        type: 'error',
        // @ts-ignore
        message: state.error?.response?.data?.message ?? 'An error occured!'
      })
    }
  }, [state.error])

  return <Button {...props} onClick={() => fn()} loading={state.loading} />
}
