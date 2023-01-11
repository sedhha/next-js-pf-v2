import React from 'react';
import classes from './Awards.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import AwardCard from './AwardCard';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { println } from '@/utils/dev-utils';
import attributes from '@/constants/header-attr.json';
import events from '@/constants/cms-constants/events-participations.json';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { ITotal } from '@/interfaces/api';
import { IEventAndParticipations } from '@/interfaces/events-and-participations';
import { useAppDispatch } from '@/redux/hooks';
import { updatePopup } from '@/slices/navigation.slice';
import { feFetch } from '@/utils/fe/fetch-utils';

const limit = 6;
const initialItems = events.slice(0, limit);
let reciprocator = -1;

const Awards = () => {
	const [skip, setSkip] = React.useState(0);
	const [total, setTotal] = React.useState(18);
	const [cardItems, setCardItems] =
		React.useState<IEventAndParticipations[]>(initialItems);
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
					description: "That's all the events I have participated in.",
					timeout: 3000
				})
			);
			return;
		} else if (!next && skip - limit < 0) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Reached Start!',
					description:
						"You're already at the most recent part of my event participations!",
					timeout: 3000
				})
			);
			return;
		}
		setLoading(true);
		const current = next ? skip + limit : skip - limit;
		setSkip(current);
		feFetch<ITotal<IEventAndParticipations>>({
			url: `${PUBLIC_APIS.EVENTS}?limit=${limit}&skip=${current}`
		})
			.then((res) => {
				if (!res.error && res.json) {
					setCardItems(res.json.items);
					setTotal(res.json.total);
				}
			})
			.finally(() => setLoading(false));
	};
	console.log('Re-render');
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Visible Awards')}
			Component={
				<section className={classes.BodyModule} id={attributes.Awards}>
					<h1 className={classes.H1Main}>Events and Participations</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft
							height={50}
							className={[classes.NoMobile, classes.NavButton].join(' ')}
							onClick={() => onPaginate(false)}
						/>
						<div className={classes.AwardContainer}>
							{cardItems.map((item, index) => {
								if (index % 2 === 1) reciprocator *= -1;
								return <AwardCard {...item} alter={reciprocator} key={index} />;
							})}
						</div>
						<SvgRight
							height={50}
							className={[classes.NoMobile, classes.NavButton].join(' ')}
							onClick={() => onPaginate(true)}
						/>
					</div>
				</section>
			}
		/>
	);
};

export default Awards;
