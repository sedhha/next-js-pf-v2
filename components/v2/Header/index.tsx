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
	const { showMore, activeSection } = useAppSelector(
		(state) => state.navigation
	);
	const indexOfActiveElement = headerElements.findIndex(
		(item) => item.value === activeSection
	);
	const hiddenActiveElement = indexOfActiveElement > 2;

	return (
		<header className={classes.Header}>
			<div className={classes.LogoSection}>
				<h1>Shivam Sahil</h1>
				<LazyImage className={classes.LogoImage} src={'/morpankh.svg'} />
			</div>
			<div className={classes.HeaderElements}>
				{headerElements.map((element, index) => {
					return (
						<Link href={'#' + element.value} key={element.value} scroll>
							<h1
								className={[
									classes.HeaderElement,
									index === indexOfActiveElement ? classes.ActiveItem : null
								].join(' ')}
							>
								{element.label}
							</h1>
						</Link>
					);
				})}

				<div
					className={[
						classes.Select,
						classes.NoDecoration,
						hiddenActiveElement ? classes.ActiveItem : null
					].join(' ')}
				>
					More
					<div className={classes.SelectDropDown}>
						{headerElements.map((element) => (
							<Link href={'#' + element.value} key={element.value} scroll>
								<h1
									key={element.value}
									className={
										element.value === activeSection
											? classes.ActiveDropDownElement
											: undefined
									}
								>
									{element.label}
								</h1>
							</Link>
						))}
					</div>
				</div>
			</div>

			<Toggle />
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
			</div>
		</header>
	);
};

export default Header;
