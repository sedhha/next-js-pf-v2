import React from 'react';
import classes from './ToggleSwitch.module.scss';

type Props = {
  lightMode: boolean;
  setLightMode: (lightMode: boolean) => void;
};

export default function ToggleSwitch(props: Props) {
  const { lightMode, setLightMode } = props;
  const selectionClass = lightMode
    ? classes.ToggleSwitchLight
    : classes.ToggleSwitchDark;
  const selectionBGClass = lightMode
    ? classes.ToggleSwitchBoxLight
    : classes.ToggleSwitchBoxDark;

  return (
    <div className={[classes.ToggleSwitchBox, selectionBGClass].join(' ')}>
      <div
        onClick={() => setLightMode(!lightMode)}
        className={[classes.ToggleSwitchCircle, selectionClass].join(
          ' '
        )}></div>
    </div>
  );
}
