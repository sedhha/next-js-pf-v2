import React from 'react';
import classes from './Testimonials.module.css';
import SvgRight from '@/v2/common/SvgRight';
import SvgLeft from '@/v2/common/SvgLeft';
import SocialIcons from '@/v2/common/SocialIcons';
import LazyImage from '@/v2/common/LazyImage';
import VisibilityHandler from '../common/VisibilityController/index';
import { println } from '@/utils/dev-utils';
import attributes from '@/constants/header-attr.json';
import { ITestimonials } from '@/interfaces/testimonials';
import testimonials from '@/constants/cms-constants/testimonial.json';
import { useAppDispatch } from '@/redux/hooks';
import { updatePopup } from '@/slices/navigation.slice';
import { ITotal } from '@/interfaces/api';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import { feFetch } from '@/utils/fe/fetch-utils';
type Props = {};
const limit = 1;
const initialItems = testimonials.slice(0, limit)[0];

export default function Testimonials({}: Props) {
	const [skip, setSkip] = React.useState(0);
	const [total, setTotal] = React.useState(5);
	const [cardItem, setCardItem] = React.useState<ITestimonials>(initialItems);
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
		feFetch<ITotal<ITestimonials>>({
			url: `${PUBLIC_APIS.TESTIMONIALS}?limit=${limit}&skip=${current}`
		})
			.then((res) => {
				if (!res.error && res.json) {
					setCardItem(res.json.items[0]);
					setTotal(res.json.total);
				}
			})
			.finally(() => setLoading(false));
	};
	return (
		<VisibilityHandler
			onVisibleCallback={() => println('Testimonials Visible')}
			Component={
				<section className={classes.BodyModule} id={attributes.Testimonials}>
					<h1>A word about me!</h1>
					<div className={classes.TestimonialSection}>
						<SvgLeft
							className={classes.NavigationButton}
							height={140}
							onClick={() => onPaginate(false)}
						/>
						<div className={classes.Testimonial}>
							<div className={classes.TestimonialEntity}>
								<LazyImage src={'/chat-icon.png'} className={classes.ChatIcon} />
								<h1>{cardItem.name}</h1>
								<h2>{cardItem.designation}</h2>
								{cardItem.content.split('\n').map((line, index) => (
									<p key={index}>{line}</p>
								))}
								<SocialIcons iconColorClass={classes.SocialIcon} />
							</div>
						</div>
						<SvgRight
							className={classes.NavigationButton}
							height={140}
							onClick={() => onPaginate(true)}
						/>
					</div>
				</section>
			}
		/>
	);
}
