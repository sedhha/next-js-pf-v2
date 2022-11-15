import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  threshold?: number;
  rootMargin?: string;
}

export default function LazyImageLoader({
  src,
  threshold,
  rootMargin,
  ...props
}: ImageProps) {
  const ref = React.useRef(null);
  const [visibility, setVisibility] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState('/loading.gif');
  React.useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setVisibility(true);
      },
      {
        rootMargin: rootMargin ?? '0px',
        threshold: threshold ?? 0.4,
      }
    );
    const currentRef = ref.current;
    if (currentRef) imageObserver.observe(currentRef);
    return () => {
      if (currentRef) imageObserver.unobserve(currentRef);
    };
  }, []);

  React.useEffect(() => {
    if (visibility) setImageSrc(src ?? '/not-found.webp');
  }, [visibility]);
  return <img {...props} ref={ref} src={imageSrc} />;
}
