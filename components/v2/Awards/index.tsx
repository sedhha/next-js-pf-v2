import React from 'react';
import classes from './Awards.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import AwardCard from './AwardCard';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { println } from '@/utils/dev-utils';
import attributes from '@/constants/header-attr.json';

const Awards = () => {
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Visible Awards')}
			Component={
				<section className={classes.BodyModule} id={attributes.Awards}>
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
			}
		/>
	);
};

export default Awards;
