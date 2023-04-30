import React from 'react';
import classes from './SocialIcons.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Icon from '@/v2/common/Icons';
import { ISocialHandles } from '@/interfaces/testimonials';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
interface IProps {
	iconColorClass?: string;
	socialHandles: ISocialHandles[];
	openInNewTab?: boolean;
	socialIconClass?: string;
	onClick?: (icon: ISocialHandles) => void;
}
export default function SocialIcons({
	iconColorClass,
	socialHandles,
	openInNewTab,
	socialIconClass,
	onClick
}: IProps) {
	return (
		<div className={socialIconClass ?? classes.SocialIcon}>
			{socialHandles.map((icon) =>
				icon.isSvg ? (
					<Link key={icon.id} href={icon.url}>
						<a
							href={icon.url}
							target={openInNewTab ? '_blank' : '_self'}
							rel="noreferrer"
							onClick={() => onClick?.(icon)}
						>
							<Icon
								iconKey={icon.id}
								className={`${iconColorClass ?? classes.Icon}`}
							/>
						</a>
					</Link>
				) : (
					<Link key={icon.id} href={icon.url}>
						<LazyImage
							src={icon.id}
							className={`${iconColorClass ?? classes.Icon}`}
							onClick={() => onClick?.(icon)}
						/>
					</Link>
				)
			)}
		</div>
	);
}
