import React from 'react';
import classes from './Footer.module.css';
import SocialIcons from '@/v2/common/SocialIcons';
import Icon, { icons } from '@/v2/common/Icons';

const Footer = () => (
	<footer className={classes.FooterModule}>
		<section className={classes.MyDetails}>
			<h1>Shivam Sahil</h1>
			<SocialIcons iconColorClass={classes.Icons} />
			<h2>© 2023 | All rights reserved</h2>
		</section>
		<section className={classes.Subscribe}>
			<div className={classes.TextWithSymbol}>
				<h1>Keep up to date with my blogs and videos.</h1>
				<Icon iconKey={icons.AiOutlineMail} className={classes.MailIcon} />
			</div>
			<input
				placeholder="Enter your Email Address"
				className={classes.EmailInputField}
			/>
			<button>Subscribe</button>
		</section>
	</footer>
);

export default Footer;
