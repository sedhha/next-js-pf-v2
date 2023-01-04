import React from 'react';
import classes from './Header.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Toggle from '@/v2/common/RadioToggle';

const headerElements = [
	{
		label: 'About',
		value: 'about'
	},
	{
		label: 'Experience',
		value: 'experience'
	},
	{
		label: 'Contact',
		value: 'contact'
	},
	{
		label: 'Blog',
		value: 'blog'
	},
	{
		label: 'Videos',
		value: 'videos'
	},
	{
		label: 'Testimonials',
		value: 'testimonials'
	}
];

const Header = () => {
	return (
		<header className={classes.Header}>
			<div className={classes.LogoSection}>
				<h1>Shivam Sahil</h1>
				<LazyImage className={classes.LogoImage} src={'/morpankh.svg'} />
			</div>
			<div className={classes.HeaderElements}>
				{headerElements.map((element, index) => {
					return (
						<h2
							key={element.value}
							className={`${classes.HeaderElement}${
								index > 3 ? ' ' + classes.HideElement : ''
							}`}
						>
							{element.label}
						</h2>
					);
				})}
			</div>
			<Toggle />
		</header>
	);
};

export default Header;
