import React from 'react';
import classes from './header.module.css';
import NavItems from '@/components/header/NavItems';
type Props = {};

export default function Header({}: Props) {
	return (
		<div className={classes.Header}>
			<h1 className={classes.Logo}>
				Shivam <span className={classes.FocusWord}>Sahil</span>
			</h1>
			<NavItems />
		</div>
	);
}
