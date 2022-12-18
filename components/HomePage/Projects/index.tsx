import * as React from 'react';
import classes from './Projects.module.css';
import { pageSections } from '@/constants/index';
import SvgRight from '@/components/common/SvgRight';
import SvgLeft from '@/components/common/SvgLeft';
import WorkExperienceContainer from '../../common/CardContainer';

export default function WorkExperience() {
	const [skip, setStart] = React.useState(0);
	const [limit, setEnd] = React.useState(10);
	const [curr, setCurr] = React.useState(0);
	const [cards, setCards] = React.useState<
		{
			key: string;
			image: string;
			employerTitle: string;
			paras: string;
			date: string;
		}[]
	>([]);

	React.useEffect(() => {
		fetch('../../../constants/work-experience.json').then((res) =>
			res.json().then((data) => setCards(data))
		);
	}, []);
	return (
		<section
			id={pageSections.PROJECTS}
			className={`section ${classes.ProjectsContainer}`}
		>
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>Cool things I did</h1>
			</div>
			<div className={classes.WorkExperienceCardsContainer}>
				<SvgLeft className={classes.NavigationButton} height={140} />
				<WorkExperienceContainer cards={cards} curr={curr} />
				<SvgRight className={classes.NavigationButton} height={140} />
			</div>
		</section>
	);
}
