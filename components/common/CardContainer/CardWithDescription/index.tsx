import LazyImage from '@/components/common/ImageUtility';
import React from 'react';
import classes from './Card.module.css';

type Props = {
	image: string;
	employerTitle: string;
	date: string;
	paras: string;
};
export default function Card({ image, employerTitle, date, paras }: Props) {
	return (
		<div className={classes.Card}>
			<LazyImage src={image ?? '/sample.png'} className={classes.CardImage} />
			<h1 className={classes.EmployerTitle}>
				{employerTitle ?? 'Optum Inc, UnitedHealth Group'}
			</h1>
			<h2 className={classes.Dates}>{date ?? 'Nov 2021 - Present'}</h2>
			{paras.split('\n').map((para, ii) => (
				<h3 key={ii}>{para}</h3>
			))}
		</div>
	);
}
