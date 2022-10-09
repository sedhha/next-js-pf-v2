import React from 'react';
import classes from './NavItems.module.css';
import navItems from '@/constants/navItems.json';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateActiveSlice } from '@/slices/navigation.slice';

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
	const { activeSection } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const items = getItems(activeSection);
	const activeItem = getActiveItem(activeSection);
	return (
		<div className={classes.NavItemContainer}>
			{items.map((item, index) => {
				const isLastItem = index === items.length - 1;
				const isActive =
					(activeItem ? activeItem.value : activeSection) === item.value;
				return (
					<h4
						key={item.value}
						className={[
							classes.NavItem,
							isLastItem ? classes.LastItem : null,
							isActive ? classes.ActiveItem : null
						].join(' ')}
						onClick={() => {
							// TODO: verify more click
							dispatch(updateActiveSlice(item.value));
						}}
					>
						{item.label}
						{isLastItem && <BiChevronDown className={classes.ShowMoreIcon} />}
					</h4>
				);
			})}
		</div>
	);
}
