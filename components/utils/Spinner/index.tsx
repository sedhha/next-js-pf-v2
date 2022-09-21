import React from 'react';
import styles from './Spinner.module.scss';

type Props = {
  fontSize?: string;
};
export default function Spinner({ fontSize }: Props) {
  return (
    <div className={styles.loader} style={{ fontSize: fontSize ?? '25px' }}>
      Loading...
    </div>
  );
}
