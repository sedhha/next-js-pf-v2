import React from 'react';
import classes from './Card.module.css';
import LazyImage from '@/v2/common/LazyImage';

type Props = {
	className: string;
	imgClassName: string;
};

const Work = ({ className, imgClassName }: Props) => {
	return (
		<div className={className}>
			<div className={imgClassName}>
				<LazyImage src={'/sample.png'} />
			</div>
			<h1>Optum Inc, UnitedHealth Group</h1>
			<h2>Nov 2021 - Present</h2>
			<div className={classes.Description}>
				<p>
					Working as a Software Engineer, I have majorly been involved in making end
					to end applications using React and Scala as a backend service.
				</p>
				<p>
					I have been also focussing on building microservices and creating CI/CD
					workflow pipeline to optimize and facilitate automated testing and
					deployment of apps.
				</p>
			</div>
		</div>
	);
};

export default Work;
