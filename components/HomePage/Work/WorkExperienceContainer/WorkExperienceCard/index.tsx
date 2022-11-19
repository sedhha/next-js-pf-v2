import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './Card.module.css';

export default function Card() {
	return (
		<div className={classes.Card}>
			<LazyImage src={'/sample.png'} className={classes.CardImage} />
			<h1 className={classes.EmployerTitle}>Optum Inc, UnitedHealth Group</h1>
			<h2 className={classes.Dates}>Nov 2021 - Present</h2>
		</div>
	);
}
