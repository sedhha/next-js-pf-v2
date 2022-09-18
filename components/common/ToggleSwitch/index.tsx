import React from 'react';
import classes from './ToggleSwitch.module.scss';

type Props = {
  lightMode: boolean;
  setLightMode: () => void;
  firstRender: boolean;
};

export default function ToggleSwitch(props: Props) {
  const { lightMode, setLightMode, firstRender } = props;
  const selectionClass = lightMode
    ? firstRender
      ? classes.ToggleSwitchLight
      : classes.ToggleSwitchLight_inToggle
    : firstRender
    ? classes.ToggleSwitchDark
    : classes.ToggleSwitchDark_inToggle;
  const selectionBGClass = lightMode
    ? firstRender
      ? classes.ToggleSwitchBoxLight
      : classes.ToggleSwitchBoxLight_inToggle
    : firstRender
    ? classes.ToggleSwitchBoxDark
    : classes.ToggleSwitchBoxDark_inToggle;

  return (
    <div
      className={[classes.ToggleSwitchBox, selectionBGClass].join(' ')}
      onClick={setLightMode}>
      <div
        className={[classes.ToggleSwitchCircle, selectionClass].join(
          ' '
        )}></div>
    </div>
  );
}
