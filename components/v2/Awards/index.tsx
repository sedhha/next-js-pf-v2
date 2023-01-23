import React from 'react';
import classes from './Awards.module.css';
import SvgLeft from '@/v2/common/SvgLeft';
import SvgRight from '@/v2/common/SvgRight';
import AwardCard from './AwardCard';
import VisibilityHandler from '@/v2/common/VisibilityController/lite';
import attributes from '@/constants/header-attr.json';
import events from '@/constants/cms-constants/events-participations.json';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { ITotal } from '@/interfaces/api';
import { IEventAndParticipations } from '@/interfaces/events-and-participations';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	sendAnalytics,
	updatePopup,
	updateViewed
} from '@/slices/navigation.slice';
import { feFetch } from '@/utils/fe/fetch-utils';
import InfiniteCardComponent from '@/v2/common/InfiniteCard/index';

const limit = 6;
const initialItems = events.slice(0, limit);
const Awards = () => {
	const [skip, setSkip] = React.useState(0);
	const [total, setTotal] = React.useState(18);
	const [cardItems, setCardItems] =
		React.useState<IEventAndParticipations[]>(initialItems);
	const [loading, setLoading] = React.useState(false);
	const dispatch = useAppDispatch();
	const awardsViewed = useAppSelector((state) => state.navigation.awardsViewed);
	React.useEffect(() => {
		if (awardsViewed) dispatch(sendAnalytics());
	}, [awardsViewed, dispatch]);

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
		feFetch<{ json: ITotal<IEventAndParticipations> }>({
			url: `${PUBLIC_APIS.EVENTS}?limit=${limit}&skip=${current}`
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
			onVisibleCallback={() => dispatch(updateViewed('awardsViewed'))}
			Component={
				<section className={classes.BodyModule} id={attributes.Awards}>
					<h1 className={classes.H1Main}>Events and Participations</h1>
					<div className={classes.WorkExperienceContainer}>
						<SvgLeft
							height={50}
							className={[classes.NoMobile, classes.NavButton].join(' ')}
							onClick={() => onPaginate(false)}
						/>
						<InfiniteCardComponent
							Component={
								<div className={classes.AwardContainer}>
									{cardItems.map((item, index) => {
										// resetReciprocator();
										return <AwardCard {...item} alter={index} key={index} />;
									})}
								</div>
							}
							onReachedLeftCallback={() => onPaginate(false)}
							onReachedRightCallback={() => onPaginate(true)}
						/>
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
