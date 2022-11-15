import React from 'react';
import ImageComponent from '@/components/Utility/ImageUtility';
import classes from './Card.module.css';

type Props = {
	src?: string;
	alt?: string;
	lightMode?: boolean;

	heading?: string;
	subHeading?: string;
};

export default function CardComponent({
	src,
	alt,
	lightMode,
	heading,
	subHeading
}: Props) {
	const wrapperClass = `${classes.Card} ${
		lightMode ? classes.CardLight : classes.CardDark
	}`;
	const subHeadingClass = `${classes.CardSubHeading} ${
		lightMode ? classes.CardSubHeadingLight : classes.CardSubHeadingDark
	}`;
	const paraClass = `${classes.Para} ${
		lightMode ? classes.ParaLight : classes.ParaDark
	}`;
	return (
		<div className={wrapperClass}>
			<ImageComponent
				src={src ?? '/work-image.png'}
				alt={alt ?? 'Card-Component'}
				className={classes.CardImage}
			/>
			<h3 className={classes.CardHeading}>
				{heading ?? 'Optum Inc, UnitedHealth Group'}
			</h3>
			<h5 className={subHeadingClass}>{subHeading ?? 'Nov 2021 - Present'}</h5>
			<p className={paraClass}>
				Working as a Software Engineer, I have majorly been involved in making end
				to end applications using React and Scala as a backend service. I have been
				also focussing on building microservices and creating CI/CD workflow
				pipeline to optimize and facilitate automated testing and deployment of
				apps.
			</p>
		</div>
	);
}
