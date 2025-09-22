import { ReactElement } from 'react';
import classes from './AnimateDown.module.css';

interface IAnimationProp {
	children: ReactElement;
}
const AnimateDown = ({ children }: IAnimationProp) => (
	<div className={classes.AnimateDown}>{children}</div>
);

export default AnimateDown;
