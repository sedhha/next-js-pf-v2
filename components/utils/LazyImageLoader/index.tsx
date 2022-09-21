import React from 'react';
import styles from './LazyImageLoader.module.scss';

type Props = {
  src: string;
};

export default function LazyImageLoader({ src }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [classList, setClassList] = React.useState(styles.lazyLoader);
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
      console.log('Visible');
      setClassList(styles.activeLoader);
    }
  }, [visible]);

  return <div ref={ref} className={classList} data-src={src}></div>;
}
