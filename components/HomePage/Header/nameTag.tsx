import React from 'react';
import classes from './nameTag.module.scss';
type Props = { darkMode: boolean };
export default function NameTag({ darkMode }: Props) {
  return (
    <h1
      className={[classes.NameTag, darkMode ? classes.NameTag_dark : null].join(
        ' '
      )}>
      Shivam <span className={classes.LightTag}>Sahil</span>
    </h1>
  );
}
