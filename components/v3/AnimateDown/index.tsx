import classes from './AnimateDown.module.css';

interface IAnimationProp {
	children: JSX.Element;
}
const AnimateDown = ({ children }: IAnimationProp) => (
	<div className={classes.AnimateDown}>{children}</div>
);

export default AnimateDown;
