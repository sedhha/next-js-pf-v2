import React from 'react';
import classes from './header.module.css';
import NavItems from '@/components/header/NavItems';
import ViewIcon from './ViewIcon';
import DarkModeToggle from './DarkModeToggle';
import LazyImage from '@/components/common/ImageUtility';
import { useAppSelector } from '../../redux/tools/hooks';

export default function Header() {
	return (
		<div className={classes.Header}>
			<div className={classes.LogoBox}>
				<h1 className={classes.Logo}>
					Shivam <span className={classes.FocusWord}>Sahil</span>
				</h1>
				<LazyImage className={classes.LogoImage} src={'/morpankh.svg'} />
			</div>
			<DarkModeToggle />
			<NavItems />
			<ViewIcon />
		</div>
	);
}
