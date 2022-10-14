import React from 'react';
import classes from './NavItems.module.css';
import navItems from '@/constants/navItems.json';
import { BiChevronDown } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateActiveSlice, updateShowMore } from '@/slices/navigation.slice';
import { motion } from 'framer-motion';

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
	const { activeSection, showMore } = useAppSelector(
		(state) => state.navigation
	);
	const dispatch = useAppDispatch();
	const items = getItems(activeSection);
	const activeItem = getActiveItem(activeSection);
	const showMoreDetails = (show: boolean) => dispatch(updateShowMore(show));
	return (
		<div className={classes.NavItemBlock}>
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
							onClick={() => !isLastItem && dispatch(updateActiveSlice(item.value))}
							onMouseEnter={() => isLastItem && showMoreDetails(true)}
						>
							{item.label}
							{isLastItem && navItems.length > 5 && (
								<React.Fragment>
									<BiChevronDown className={classes.ShowMoreIcon} />
								</React.Fragment>
							)}
						</h4>
					);
				})}
			</div>

			<div
				className={[showMore ? classes.Expander : classes.HideWithAnimation].join(
					' '
				)}
				onMouseLeave={() => showMoreDetails(false)}
			>
				{navItems.slice(5, navItems.length - 1).map((item) => {
					const isActive =
						(activeItem ? activeItem.value : activeSection) === item.value;
					return (
						<h4
							key={item.value}
							className={[
								classes.NavItem,
								isActive ? classes.ActiveItem : classes.PassiveItem
							].join(' ')}
							onClick={() => {
								dispatch(updateActiveSlice(item.value));
								showMoreDetails(false);
							}}
						>
							{item.label}
						</h4>
					);
				})}
			</div>
		</div>
	);
}
