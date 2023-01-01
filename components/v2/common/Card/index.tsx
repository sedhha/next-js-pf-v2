import React from 'react';
import classes from './Card.module.css';
import LazyImage from '@/v2/common/LazyImage';

const Work = () => {
	return (
		<div className={classes.Card}>
			<LazyImage src={'/sample.png'} className={classes.Image} />
			<h1>Optum Inc, UnitedHealth Group</h1>
		</div>
	);
};

export default Work;
