import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import classes from './MobileNavigator.module.css';
import headerElements from '@/constants/headers.json';
import Link from 'next/link';
import { useAppDispatch } from '../../../redux/tools/hooks';
import { updateShowMore } from '@/slices/navigation.slice';
import { onNewSectionView } from '@/slices/analytics.slice';

const MobileNavigator = () => {
	const {
		navigation: { showMore },
		analytics: {
			staticContent: {
				navigations: { latestViewed }
			}
		}
	} = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const onNavigationClick = (activeSection: string) => {
		dispatch(onNewSectionView(activeSection));
		dispatch(updateShowMore(false));
	};
	return showMore ? (
		<div className={classes.ShowMore}>
			{headerElements.map((element) => (
				<Link href={'#' + element.value} key={element.value} scroll>
					<h1
						key={element.value}
						is-active={`${latestViewed === element.value}`}
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
