import ToggleSwitch from '@/components/common/ToggleSwitch';
import React from 'react';
import classes from './header.module.scss';
import HeaderList from './HeaderList';
import NameTag from './nameTag';

export default function Header() {
  const [lightMode, setLightMode] = React.useState(true);
  return (
    <div className={classes.Header}>
      <NameTag />
      <HeaderList />
      <ToggleSwitch lightMode={lightMode} setLightMode={setLightMode} />
    </div>
  );
}
