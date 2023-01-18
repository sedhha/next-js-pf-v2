import React from 'react';
import classes from './Work.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import Card from '@/v2/common/Card';
import attributes from '@/constants/header-attr.json';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { println } from '@/utils/dev-utils';
import workExperience from '@/constants/cms-constants/work-experience.json';
import dynamic from 'next/dynamic';
import { feFetch } from '@/utils/fe/fetch-utils';
import { IWork } from '@/interfaces/work';
import { useAppDispatch } from '@/redux/hooks';
import { updatePopup } from '@/slices/navigation.slice';
import { workDateFormatter } from '@/utils/date-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { ITotal } from '@/interfaces/api';
import InfiniteCardComponent from '@/v2/common/InfiniteCard/index';

const limit = 3;
const initialItems = workExperience.slice(0, limit);

const Spinner = dynamic(() => import('@/v2/common/Spinner'));

const Work = () => {
	const [skip, setSkip] = React.useState(0);
	const [total, setTotal] = React.useState(11);
	const [cardItems, setCardItems] = React.useState<IWork[]>(initialItems);
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
					description: "That's all the work experience I have for now!",
					timeout: 3000
				})
			);
			return;
		} else if (!next && skip - limit < 0) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Reached Start!',
					description: "You're already at the most recent part of my work journey!",
					timeout: 3000
				})
			);
			return;
		}
		setLoading(true);
		const current = next ? skip + limit : skip - limit;
		setSkip(current);
		feFetch<{ json: ITotal<IWork> }>({
			url: `${PUBLIC_APIS.WORK_EXPERIENCE}?limit=${limit}&skip=${current}`
		})
			.then((res) => {
				if (!res.error && res.json?.json) {
					setCardItems(res.json.json.items);
					setTotal(res.json.json.total);
				}
			})
			.finally(() => setLoading(false));
	};

	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Visible Work Experience')}
			Component={
				<section className={classes.BodyModule} id={attributes.WorkExperience}>
					{loading && <Spinner />}
					<h1 className={classes.H1Main}>Work Experience</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft
							height={50}
							className={classes.NavButton}
							onClick={() => onPaginate(false)}
						/>
						<InfiniteCardComponent
							Component={
								<div className={classes.WorkCardContainer}>
									{cardItems.map((item, index) => (
										<Card
											className={classes.Card}
											imgClassName={classes.Image}
											key={index}
											h1Text={item.org}
											h2Text={item.designation}
											h3Text={workDateFormatter({
												startDate: item.startDate,
												endDate: item.endDate,
												current: item.current
											})}
											pText={item.description}
											imgSrc={item.img}
										/>
									))}
								</div>
							}
							onReachedLeftCallback={() => onPaginate(false)}
							onReachedRightCallback={() => onPaginate(true)}
						/>

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

export default Work;
