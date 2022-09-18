import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import AboutSection from './About';
import Header from './Header';
import classes from './HomePage.module.scss';

export default function HomePage() {
  const { darkMode, firstRender } = useAppSelector((state) => state.ui);

  const classElements = [
    !firstRender ? classes.Body_inToggle : classes.Body,
    darkMode ? classes.Body_dark : null,
  ].join(' ');
  return (
    <div className={classElements}>
      <Header />
      <AboutSection />
    </div>
  );
}
