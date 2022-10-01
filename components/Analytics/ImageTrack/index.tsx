import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  viewabilityPercentage?: number;
  onImageVisibleCallback: () => void;
}

export default function ImageTrackComponent({
  viewabilityPercentage,
  onImageVisibleCallback,
  ...props
}: ImageProps) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) onImageVisibleCallback();
      },
      {
        threshold: viewabilityPercentage ?? 0.8,
      }
    );
    const imageRef = ref.current;
    if (imageRef) imageObserver.observe(imageRef);
    return () => {
      if (imageRef) imageObserver.unobserve(imageRef);
    };
  }, []);
  return <img {...props} ref={ref} />;
}
