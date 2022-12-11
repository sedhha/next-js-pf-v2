import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import Rating from './Rating';
import classes from './StackCard.module.css';

type Props = {
	rating: number;
	title: string;
};

export default function StackCard({ rating, title }: Props) {
	return (
		<div className={classes.StackCard}>
			<LazyImage src={'/next-ts.png'} className={classes.Image} />
			<h5>{title}</h5>
			<Rating rating={rating} />
		</div>
	);
}
