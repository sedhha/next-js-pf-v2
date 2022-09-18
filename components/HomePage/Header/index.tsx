import ToggleSwitch from '@/components/common/ToggleSwitch';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import classes from './header.module.scss';
import HeaderList from './HeaderList';
import NameTag from './nameTag';
import NavBar from './NavBar';

export default function Header() {
  const [lightMode, setLightMode] = React.useState(true);
  const { showNavBar, routes, darkMode, activeRoute } = useAppSelector(
    (state) => state.ui
  );
  return (
    <div className={classes.Header}>
      <NameTag />
      <HeaderList />
      <ToggleSwitch lightMode={lightMode} setLightMode={setLightMode} />
      <NavBar />
    </div>
  );
}
