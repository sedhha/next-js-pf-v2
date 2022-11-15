import ToggleSwitch from '@/components/common/ToggleSwitch';
import React from 'react';
import classes from './header.module.scss';
import NameTag from './nameTag';

export default function Header() {
  const [lightMode, setLightMode] = React.useState(false);
  return (
    <div className={classes.Header}>
      <NameTag />
      <ToggleSwitch lightMode={lightMode} setLightMode={setLightMode} />
    </div>
  );
}
