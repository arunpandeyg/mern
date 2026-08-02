import {IKImage} from 'imagekitio-react';
import React from 'react'

const Image = ({ 
    src, alt, className, 
    // ...props,
     w, h 
}) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/4tqj8h7u9'}
      path={src}
      alt={alt}
      loading='lazy'
      lqip={{ active: true, quality: 60 }}
      className={className}
    //   {...props}
      width={w}
      height={h}
      transformation={[{ resize: { width: w, height: h } }]}
    />
  )
}

export default Image