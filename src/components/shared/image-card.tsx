import React, { FC } from 'react'

export interface ImageCardProps {
  src: string
}

export const ImageCard: FC<ImageCardProps> = ({ src, children }) => {
  return (
    <div>
      <div
        className="image-card-bg-container"
        style={{ backgroundImage: `url(${src})` }}
      />

      {children}
    </div>
  )
}
