import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  rootMargin?: string;
  threshold?: number;
}

const LOADING_URI = '/loading.gif';
export default function LazyImageLoader({
  src,
  rootMargin,
  threshold,
  ...props
}: LazyImageProps) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log(entry);
      },
      {
        rootMargin: rootMargin ?? '0px',
        threshold: threshold ?? 0,
      }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);
  return <img ref={ref} {...props} />;
}
