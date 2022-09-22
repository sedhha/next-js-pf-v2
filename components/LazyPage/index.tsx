import React from 'react';
import LazyImageLoader from '../utils/LazyImageLoader';
import styles from './LazyPage.module.scss';

export default function LazyPage() {
  return (
    <div className={styles.LazyPage}>
      <div className={styles.LargeAreaContent}>Large Area Content</div>
      <LazyImageLoader
        src={'/vercel.svg'}
        style={{ height: 200, width: 200 }}
      />
    </div>
  );
}
