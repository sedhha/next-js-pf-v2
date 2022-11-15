import React from 'react';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function LazyImageLoader({ src, ...props }: ImageProps) {
  const ref = React.useRef<HTMLImageElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(
    '/loading.gif'
  );
  React.useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);
  React.useEffect(() => {
    if (visible) {
      setImageSrc(src);
    } else console.log('Hidden');
  }, [visible]);

  return <img {...props} src={imageSrc} ref={ref}></img>;
}
