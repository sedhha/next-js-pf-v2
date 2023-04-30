import React from 'react';
import classes from './Header.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Toggle from '@/v2/common/RadioToggle';
import headerElements from '@/constants/headers.json';
import Link from 'next/link';
import Icon, { icons } from '@/v2/common/Icons/index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateShowMore } from '@/slices/navigation.slice';
import { useRouter } from 'next/router';

const Header = () => {
	const dispatch = useAppDispatch();
	const {
		navigation: { showMore },
		analytics: {
			staticContent: {
				navigations: { latestViewed }
			}
		}
	} = useAppSelector((state) => state);
	const router = useRouter();
	const indexOfActiveElement = headerElements.findIndex(
		(item) => item.value === latestViewed
	);
	const onChangeRoute = (url: string) => {
		router.push(`/#${url}`);
	};
	const gotoHomeRoute = () => {
		router.push(`/`);
	};
	const hiddenActiveElement = indexOfActiveElement > 2;

	return (
		<header className={classes.Header}>
			<div className={classes.LogoSection} onClick={gotoHomeRoute}>
				<h1>Shivam Sahil</h1>
				<LazyImage
					className={classes.LogoImage}
					src={'/morpankh.svg'}
					alt="Shivam Sahil | Developer - Morpankh Logo"
				/>
			</div>
			<div className={classes.HeaderElements}>
				{headerElements.map((element, index) => {
					return (
						<h1
							key={element.value}
							className={[
								classes.HeaderElement,
								index === indexOfActiveElement ? classes.ActiveItem : null
							].join(' ')}
							onClick={() => onChangeRoute(element.value)}
						>
							{element.label}
						</h1>
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
							<h1
								key={element.value}
								className={
									element.value === latestViewed
										? classes.ActiveDropDownElement
										: undefined
								}
								onClick={() => onChangeRoute(element.value)}
							>
								{element.label}
							</h1>
						))}
					</div>
				</div>
			</div>

			<Toggle />
			<div className={classes.MobileOnly}>
				{showMore ? (
					<Icon
						iconKey={icons.ImCross}
						className={classes.ShowMoreIcon}
						onClick={() => dispatch(updateShowMore(false))}
					/>
				) : (
					<Icon
						iconKey={icons.HiViewList}
						className={classes.ShowMoreIcon}
						onClick={() => dispatch(updateShowMore(true))}
					/>
				)}
			</div>
		</header>
	);
};

export default Header;
