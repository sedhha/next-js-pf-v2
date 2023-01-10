import React from 'react';
import classes from './Empty.module.css';
import LazyImage from '@/v2/common/LazyImage';

const NoResultsFound = () => {
	return (
		<div className={classes.NotFoundContainer}>
			<LazyImage src={'/illustrations/void.svg'} className={classes.Img} />
			<p>
				<strong>Oops</strong> No stars in the sky today and no results for your
				search!
			</p>
		</div>
	);
};

export default NoResultsFound;
