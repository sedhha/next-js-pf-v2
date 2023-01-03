import React from 'react';
import classes from './Awards.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import AwardCard from './AwardCard';

const Awards = () => {
	return (
		<section className={classes.BodyModule}>
			<h1 className={classes.H1Main}>Awards and Recognitions</h1>
			<div className={classes.WorkExperienceContainer}>
				<SvgLeft height={50} className={classes.NoMobile} />
				<div className={classes.AwardContainer}>
					<AwardCard alter={-1} />
					<AwardCard alter={-1} />
					<AwardCard alter={1} />
					<AwardCard alter={1} />
					<AwardCard alter={-1} />
					<AwardCard alter={-1} />
				</div>
				<SvgRight height={50} className={classes.NoMobile} />
			</div>
		</section>
	);
};

export default Awards;
