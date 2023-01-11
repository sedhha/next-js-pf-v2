import React from 'react';
import classes from './Empty.module.css';
import LazyImage from '@/v2/common/LazyImage';

type Props = {
	imgClass?: string;
	message?: string;
};

const NoResultsFound = ({ imgClass, message }: Props) => {
	return (
		<div className={classes.NotFoundContainer}>
			<LazyImage
				src={'/illustrations/void.svg'}
				className={imgClass ?? classes.Img}
			/>
			<p>
				<strong>Oops</strong>{' '}
				{message ?? 'No stars in the sky today and no results for your search!'}
			</p>
		</div>
	);
};

export default NoResultsFound;
