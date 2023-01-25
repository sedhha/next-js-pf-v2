import React from 'react';
import classes from './SocialIcons.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Icon from '@/v2/common/Icons';
import { ISocialHandles } from '@/interfaces/testimonials';
import Link from 'next/link';
interface IProps {
	iconColorClass?: string;
	socialHandles: ISocialHandles[];
}
export default function SocialIcons({ iconColorClass, socialHandles }: IProps) {
	return (
		<div className={classes.SocialIcon}>
			{socialHandles.map((icon) =>
				icon.isSvg ? (
					<Link key={icon.id} href={icon.url}>
						<Icon iconKey={icon.id} className={`${iconColorClass ?? classes.Icon}`} />
					</Link>
				) : (
					<Link key={icon.id} href={icon.url}>
						<LazyImage
							src={icon.id}
							className={`${iconColorClass ?? classes.Icon}`}
						/>
					</Link>
				)
			)}
		</div>
	);
}
