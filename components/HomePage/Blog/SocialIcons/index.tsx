import React from 'react';
import classes from './SocialIcons.module.css';
import socialIcons from '@/constants/social-icons.json';
import LazyImage from '@/components/common/ImageUtility';
export default function SocialIcons() {
	return (
		<div className={classes.SocialIcon}>
			{socialIcons.map((icon) => (
				<LazyImage src={icon.url} key={icon.id} className={classes.Icon} />
			))}
		</div>
	);
}
