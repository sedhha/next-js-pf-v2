import React from 'react';
import classes from './SocialIcons.module.css';
import socialIcons from '@/constants/social-icons.json';
import LazyImage from '@/components/common/ImageUtility';
import Icon from '@/components/common/Icons';
export default function SocialIcons() {
	return (
		<div className={classes.SocialIcon}>
			{socialIcons.map((icon) =>
				icon['is-Svg'] ? (
					<Icon iconKey={icon.url} key={icon.id} className={classes.Icon} />
				) : (
					<LazyImage src={icon.url} key={icon.id} className={classes.Icon} />
				)
			)}
		</div>
	);
}
