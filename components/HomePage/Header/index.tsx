import ToggleSwitch from '@/components/common/ToggleSwitch';
import { toggleMode } from '@/redux-slices/ui.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import classes from './header.module.scss';
import HeaderList from './HeaderList';
import NameTag from './nameTag';
import NavBar from './NavBar';

export default function Header() {
  const { showNavBar, routes, darkMode, activeRoute } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();
  const setLightMode = () => dispatch(toggleMode());
  return (
    <div
      className={[classes.Header, darkMode ? classes.Header_dark : null].join(
        ' '
      )}>
      <NameTag darkMode={darkMode} />
      <HeaderList darkMode={darkMode} />
      <ToggleSwitch lightMode={!darkMode} setLightMode={setLightMode} />
      <NavBar />
    </div>
  );
}
