import SocialIcons from '@/components/common/SocialIcons';
import React from 'react';
import classes from './Footer.module.css';
import Icon, { icons } from '@/components/common/Icons/index';
type Props = {};

export default function Footer({}: Props) {
	return (
		<footer className={classes.Footer}>
			<div className={classes.FirstSection}>
				<h1>Shivam Sahil</h1>
				<SocialIcons iconColorClass={classes.iconColor} />
				<h4>© Copyright {new Date().getFullYear()}</h4>
			</div>
			<div className={classes.SecondSection}>
				<h2>About</h2>
				<h2>Project</h2>
				<h2>Experience</h2>
				<h2>Awards</h2>
				<h2>Blog</h2>
				<h2>Video</h2>
				<h2>Contact</h2>
				<h2>Tech Stack</h2>
			</div>
			<div className={classes.ThirdSection}>
				<div className={classes.MessageWithIcon}>
					<p>Keep up to date with my blogs and videos</p>
					<Icon iconKey={icons.AiOutlineMail} className={classes.Icon} />
				</div>
				<input
					placeholder="Enter your Email Address"
					className={classes.EmailInputField}
				/>
				<button className={`button ${classes.Button}`}>Subscribe</button>
			</div>
		</footer>
	);
}
