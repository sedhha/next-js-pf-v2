import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export default function LazyImageLoader({}: LazyImageProps) {
  return <div>LazyImageLoader</div>;
}
