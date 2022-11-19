import React from 'react';
import classes from './SvgContainer.module.css';

type Props = {
	SvgComponent: JSX.Element;
};
export default function SvgContainer({ SvgComponent }: Props) {
	return <div className={classes.SvgContainer}>{SvgComponent}</div>;
}
