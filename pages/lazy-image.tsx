import React from 'react';
import styles from '@/styles/LazyImage.module.scss';

type Props = {};

export default function LazyImage({}: Props) {
  return (
    <div>
      <div className={styles.WholePage}>Whole Screen</div>
      <div className={styles.ImageContainer}>
        <img src={'/images/image-01.jpg'} className={styles.Image} />
        <img src={'/images/image-02.jfif'} className={styles.Image} />
      </div>
    </div>
  );
}
