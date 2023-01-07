import React from 'react';
import classes from './Header.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Toggle from '@/v2/common/RadioToggle';
import headerElements from '@/constants/headers.json';
import Link from 'next/link';
import Icon, { icons } from '@/v2/common/Icons/index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateShowMore } from '@/slices/navigation.slice';

const Header = () => {
	const dispatch = useAppDispatch();
	const { showMore } = useAppSelector((state) => state.navigation);
	return (
		<header className={classes.Header}>
			<div className={classes.LogoSection}>
				<h1>Shivam Sahil</h1>
				<LazyImage className={classes.LogoImage} src={'/morpankh.svg'} />
			</div>
			<div className={classes.HeaderElements}>
				{headerElements.map((element) => {
					return (
						<Link href={'#' + element.value} key={element.value}>
							<h1 className={classes.HeaderElement}>{element.label}</h1>
						</Link>
					);
				})}

				<div className={classes.Select}>
					More
					<div className={classes.SelectDropDown}>
						{headerElements.map((element) => (
							<Link href={'#' + element.value} key={element.value}>
								<h1 key={element.value}>{element.label}</h1>
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className={classes.MobileOnly}>
				{showMore ? (
					<Icon
						iconKey={icons.ImCross}
						onClick={() => dispatch(updateShowMore(false))}
					/>
				) : (
					<Icon
						iconKey={icons.HiViewList}
						onClick={() => dispatch(updateShowMore(true))}
					/>
				)}
				<Toggle />
			</div>
		</header>
	);
};

export default Header;
