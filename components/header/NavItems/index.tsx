import React from 'react';
import classes from './NavItems.module.css';
import navItems from '@/constants/navItems.json';

const getActiveItem = (activeItem: string) => {
	const result = navItems.find((element) => element.value === activeItem);
	return result;
};
const moreItems = {
	value: 'more',
	label: 'More',
	index: -1
};

const getItems = (activeItem: string) => {
	const activeElement = getActiveItem(activeItem);
	if (navItems.length > 5 && activeElement) {
		if (activeElement.index > 3) return [...navItems.slice(0, 4), activeElement];
		return [...navItems.slice(0, 4), moreItems];
	}
	return navItems;
};

export default function NavItems() {
	const items = getItems('about');
	return (
		<div className={classes.NavItemContainer}>
			{items.map((item) => {
				return (
					<h4 key={item.value} className={classes.NavItem}>
						{item.label}
					</h4>
				);
			})}
		</div>
	);
}
