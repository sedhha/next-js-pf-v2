import React from 'react';
import classes from './Projects.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';
import { IProject } from '@/interfaces/projects';
import projects from '@/constants/cms-constants/projects.json';
import { useAppDispatch } from '@/redux/hooks';
import dynamic from 'next/dynamic';
import Card from '@/v2/common/Card';
import { updatePopup } from '@/slices/navigation.slice';
import { ITotal } from '../../../interfaces/api';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { feFetch } from '../../../utils/fe/fetch-utils';

const limit = 3;
const initialItems = projects.slice(0, limit);
const Spinner = dynamic(() => import('@/v2/common/Spinner'));

const Projects = () => {
	const [skip, setSkip] = React.useState(0);
	const [total, setTotal] = React.useState(11);
	const [cardItems, setCardItems] = React.useState<IProject[]>(initialItems);
	const [loading, setLoading] = React.useState(false);
	const dispatch = useAppDispatch();

	const onPaginate = (next: boolean) => {
		if (loading) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Loading results',
					description: 'Please wait while we load the results!',
					timeout: 3000
				})
			);
			return;
		}
		if (next && (skip >= total || skip + limit >= total)) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Reached End!',
					description: "That's all the projects I have done so far!",
					timeout: 3000
				})
			);
			return;
		} else if (!next && skip - limit < 0) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Reached Start!',
					description: "You're already at the most recent part of my projects!",
					timeout: 3000
				})
			);
			return;
		}
		setLoading(true);
		const current = next ? skip + limit : skip - limit;
		setSkip(current);
		feFetch<ITotal<IProject>>({
			url: `${PUBLIC_APIS.PROJECTS}?limit=${limit}&skip=${current}`
		})
			.then((res) => {
				if (!res.error && res.json) {
					setCardItems(res.json.items);
					setTotal(res.json.total);
				}
			})
			.finally(() => setLoading(false));
	};
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Projects visible')}
			Component={
				<section className={classes.BodyModule} id={attributes.Projects}>
					{loading && <Spinner />}
					<h1 className={classes.H1Main}>Cool things I did!</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft
							height={50}
							className={classes.NavButton}
							onClick={() => onPaginate(false)}
						/>
						<div className={classes.WorkCardContainer}>
							{cardItems.map((item, index) => (
								<Card
									className={classes.Card}
									imgClassName={classes.Image}
									key={index}
									h1Text={item.name}
									actionButtons={item.actionButtons}
									pText={item.description}
									imgSrc={item.img}
								/>
							))}
						</div>
						<SvgRight
							height={50}
							className={classes.NavButton}
							onClick={() => onPaginate(true)}
						/>
					</div>
				</section>
			}
		/>
	);
};

export default Projects;
