import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export default function LazyImageLoader({ src, ...props }: LazyImageProps) {
  const [visible, setVisible] = React.useState(false);
  return <div>LazyImageLoader</div>;
}
