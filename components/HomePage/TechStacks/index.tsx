import React from 'react';
import { pageSections } from '@/constants/index';
import classes from './TechStack.module.css';
import Icon, { icons } from '@/components/common/Icons/index';
import StackCard from './StackCard';
type Props = {};

export default function Testimonials({}: Props) {
	return (
		<section id={pageSections.TECHSTACK} className="section">
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>My Tech Stack</h1>
				<div className={classes.SearchWidget}>
					<input className={classes.SearchInput} />
					<Icon iconKey={icons.AiOutlineSearch} className={classes.Icon} />
				</div>
			</div>
			<div className={classes.StackCards}>
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
				<StackCard rating={4} title={'Next JS'} />
			</div>
		</section>
	);
}