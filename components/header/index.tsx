import React from 'react';
import classes from './header.module.css';
import NavItems from '@/components/header/NavItems';
type Props = {};

export default function Header({}: Props) {
	return (
		<div className={classes.Header}>
			<h1 className={classes.Logo}>
				Display <span className={classes.FocusWord}>Name</span>
			</h1>
			<NavItems />
		</div>
	);
}
