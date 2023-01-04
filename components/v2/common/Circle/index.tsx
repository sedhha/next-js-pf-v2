import React from 'react';
import classes from './Circle.module.css';

type Props = {
	size?: string;
	color?: string;
	className?: string;
};
const Circle = ({ size, color, className }: Props) => {
	return (
		<section
			className={`${classes.Circle}${className ? ' ' + className : ''}`}
			style={{
				...(size && { height: size }),
				...(color && { background: color })
			}}
		></section>
	);
};

export default Circle;
