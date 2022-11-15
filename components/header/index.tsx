import React from 'react';
import classes from './header.module.css';
import NavItems from '@/components/header/NavItems';
import ViewIcon from './ViewIcon';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
	return (
		<div className={classes.Header}>
			<h1 className={classes.Logo}>
				Display <span className={classes.FocusWord}>Name</span>
			</h1>
			<DarkModeToggle />
			<NavItems />
			<ViewIcon />
		</div>
	);
}
