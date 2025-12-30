import React from 'react';
import classes from './Intro.module.css';
import LazyImage from '@/v2/common/LazyImage';
import attributes from '@/constants/header-attr.json';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onBackImageViewed, onNewSectionView } from '@/slices/analytics.slice';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';
import { shallowEqual } from 'react-redux';

const Intro = () => {
	const dispatch = useAppDispatch();
	const {
		csrfToken,
		visitorID,
		clickEvents } = useAppSelector((state) => ({
			csrfToken: state.navigation.csrfToken,
			visitorID: state.analytics.visitorID,
			clickEvents: state.analytics.staticContent.clickEvents
		}), shallowEqual);

	return (
		<VisibilityHandler
			onVisibleCallback={() => dispatch(onNewSectionView(attributes.About))}
			Component={
				<section className={classes.BodyModule} id={attributes.About}>
					<h1 className={classes.H1Main}>Tat Tvam Asi</h1>
					<h2 className={classes.Intro}>
						The cosmos might be—
						<br />
						<span>or it might not be? ☢️🐱</span>
					</h2>
					<div className={classes.ImageContainer}>
						<div className={`${classes.Side} ${classes.Front}`}>
							<LazyImage
								src={'/intro-image.jpg'}
								className={classes.Image}
								alt={'Shivam -Sahil: Developer'}
							/>
						</div>
						<div className={`${classes.Side} ${classes.Back}`}>
							<LazyImage
								src={'/intro-image.jpeg'}
								className={classes.Image}
								alt={'Shivam -Sahil: Developer'}
								onMouseEnter={() => {
									dispatch(onBackImageViewed());
									if (csrfToken) {
										const key = `viewedBackImage-${visitorID}`;
										const payload = {
											clickIdentifier: key,
											clickDescription:
												'This event denotes that user has viewed the back image by hovering over the front image.',
											clickPerformedAt: new Date().toISOString(),
											clickedTimes: (clickEvents[key]?.clickedTimes ?? 0) + 1
										};
										logEvent(csrfToken, key, payload);
									}
								}}
							/>
						</div>
					</div>
					<div className={classes.IntroPara}>
						<h4>
							Still figuring out why am I here? What is that elusive force, entangled
							so deeply within me, that dares to project the infinite onto the canvas
							of my being? Re-discovering the things but from inside this time.
						</h4>

						<h4>
							The universe might just be a quantum computer where whatever that can
							happen will happen! Wondering if my choices are algorithms in motion or
							merely outcomes of probabilities collapsing into reality.
						</h4>
					</div>
				</section>
			}
		/>
	);
};

export default Intro;
