import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import classes from './MobileNavigator.module.css';
import headerElements from '@/constants/headers.json';
import Link from 'next/link';
import { useAppDispatch } from '../../../redux/tools/hooks';
import { updateActiveSection, updateShowMore } from '@/slices/navigation.slice';

const MobileNavigator = () => {
	const { showMore, activeSection } = useAppSelector(
		(state) => state.navigation
	);
	const dispatch = useAppDispatch();
	const onNavigationClick = (activeSection: string) => {
		dispatch(updateActiveSection(activeSection));
		dispatch(updateShowMore(false));
	};
	return showMore ? (
		<div className={classes.ShowMore}>
			{headerElements.map((element) => (
				<Link href={'#' + element.value} key={element.value} scroll>
					<h1
						key={element.value}
						is-active={`${activeSection === element.value}`}
						onClick={() => onNavigationClick(element.value)}
					>
						{element.label}
					</h1>
				</Link>
			))}
		</div>
	) : null;
};

export default MobileNavigator;
