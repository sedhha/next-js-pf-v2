import ToggleSwitch from '@/components/common/ToggleSwitch';
import { toggleMode } from '@/redux-slices/ui.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import classes from './header.module.scss';
import HeaderList from './HeaderList';
import NameTag from './nameTag';
import NavBar from './NavBar';

export default function Header() {
  const { showNavBar, routes, darkMode, activeRoute, firstRender } =
    useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const setLightMode = () => dispatch(toggleMode());
  const classElements = [
    !firstRender ? classes.Header_inToggle : classes.Header,
    darkMode ? classes.Header_dark : null,
  ].join(' ');
  return (
    <div className={classElements}>
      <NameTag darkMode={darkMode} />
      <HeaderList darkMode={darkMode} />
      <ToggleSwitch
        firstRender={firstRender}
        lightMode={!darkMode}
        setLightMode={setLightMode}
      />
      <NavBar />
    </div>
  );
}
