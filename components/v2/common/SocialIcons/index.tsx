import React from 'react';
import classes from './SocialIcons.module.css';
import socialIcons from '@/constants/social-icons.json';
import LazyImage from '@/v2/common/LazyImage';
import Icon from '@/v2/common/Icons';
interface IProps {
	iconColorClass?: string;
}
export default function SocialIcons({ iconColorClass }: IProps) {
	return (
		<div className={classes.SocialIcon}>
			{socialIcons.map((icon) =>
				icon['is-Svg'] ? (
					<Icon
						iconKey={icon.url}
						key={icon.id}
						className={`${classes.Icon} ${iconColorClass ?? ''}`}
					/>
				) : (
					<LazyImage
						src={icon.url}
						key={icon.id}
						className={`${classes.Icon} ${iconColorClass ?? ''}`}
					/>
				)
			)}
		</div>
	);
}
