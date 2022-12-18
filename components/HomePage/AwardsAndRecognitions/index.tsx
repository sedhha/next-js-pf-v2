import React from 'react';
import classes from './Awards.module.css';
import { pageSections } from '../../../constants/index';
import SvgLeft from '../../common/SvgLeft/index';
import SvgRight from '@/components/common/SvgRight';
import AwardCard from './AwardCard';
type Props = {};

export default function Awards({}: Props) {
	return (
		<section id={pageSections.AWARDS} className="section">
			<br />
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>Awards And Recognitions</h1>
			</div>

			<div className={classes.AwardsSection}>
				<SvgLeft className={classes.NavigationButton} height={140} />
				<div className={classes.Awards}>
					<AwardCard alter={1} />
					<AwardCard alter={-1} />
					<AwardCard alter={-1} />
					<AwardCard alter={1} />
					<AwardCard alter={1} />
					<AwardCard alter={-1} />
				</div>
				<SvgRight className={classes.NavigationButton} height={140} />
			</div>
		</section>
	);
}
