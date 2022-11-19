import React from 'react';
import classes from './NavItems.module.css';
import navItems from '@/constants/navItems.json';
import { BiChevronDown } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateActiveSlice, updateShowMore } from '@/slices/navigation.slice';

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
	const { activeSection, showMore, darkMode } = useAppSelector(
		(state) => state.navigation
	);
	const dispatch = useAppDispatch();
	const items = getItems(activeSection);
	const activeItem = getActiveItem(activeSection);

	return (
		<div
			className={classes.NavItemBlock}
			onMouseLeave={() => dispatch(updateShowMore(false))}
		>
			<div className={[classes.NavItemContainer].join(' ')}>
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
								isActive ? classes.ActiveItem : classes.PassiveItem
							].join(' ')}
							onClick={() => !isLastItem && dispatch(updateActiveSlice(item.value))}
							onMouseEnter={() => {
								isLastItem && dispatch(updateShowMore(true));
								!isLastItem && dispatch(updateShowMore(false));
							}}
						>
							{item.label}
							{isLastItem && navItems.length > 5 && (
								<React.Fragment>
									<BiChevronDown className={classes.ShowMoreIcon} />
									<div
										className={[
											showMore ? classes.Expander : classes.HideWithAnimation
										].join(' ')}
										onMouseEnter={() => dispatch(updateShowMore(true))}
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
														dispatch(updateShowMore(false));
													}}
												>
													{item.label}
												</h4>
											);
										})}
									</div>
								</React.Fragment>
							)}
						</h4>
					);
				})}
			</div>
		</div>
	);
}
