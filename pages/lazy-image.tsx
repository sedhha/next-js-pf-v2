import React from 'react';
import styles from '@/styles/LazyImage.module.scss';
import LazyImageLoader from '@/components/LazyImageLoader';

type Props = {};

export default function LazyImage({}: Props) {
  return (
    <div>
      <div className={styles.WholePage}>Whole Screen</div>
      <div className={styles.ImageContainer}>
        <LazyImageLoader
          src={'/images/image-01.jpg'}
          className={styles.Image}
        />
        <LazyImageLoader
          src={'/images/image-02.jfif'}
          className={styles.Image}
        />
      </div>
    </div>
  );
}
