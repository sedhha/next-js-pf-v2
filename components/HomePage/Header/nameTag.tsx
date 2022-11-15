import React from 'react';
import classes from './nameTag.module.scss';
export default function NameTag() {
  return (
    <h1 className={classes.NameTag}>
      Shivam <span className={classes.LightTag}>Sahil</span>
    </h1>
  );
}
