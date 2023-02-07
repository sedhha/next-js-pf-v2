import React from 'react';
import classes from './Intro.module.css';
import LazyImage from '@/v2/common/LazyImage';
import attributes from '@/constants/header-attr.json';
import VisibilityHandler from '@/v2/common/VisibilityController';
import { useAppDispatch } from '@/redux/hooks';
import { updateActiveSection } from '@/slices/navigation.slice';

const Intro = () => {
	const dispatch = useAppDispatch();
	return (
		<VisibilityHandler
			onVisibleCallback={() => dispatch(updateActiveSection(attributes.About))}
			Component={
				<section className={classes.BodyModule} id={attributes.About}>
					<h1 className={classes.H1Main}>Artist By Birth, Engineer by Choice</h1>
					<h2 className={classes.Intro}>
						Give me TypeScript and I will
						<br />
						<span>re-create the world!</span>
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
							/>
						</div>
					</div>
					<div className={classes.IntroPara}>
						<h4>
							Found my ikigai in making and breaking things with TypeScript. I am well
							versed with end to end application development, data processes and
							pipelines, chatbots and microservices.
						</h4>

						<h4>
							For me, the universe is nothing more than a complex mathematical model
							embedded with tons of analytical functions and expressions which has been
							programmed by the almighty god who is probably the greatest mathematician
							and programmer of all time!
						</h4>
					</div>
				</section>
			}
		/>
	);
};

export default Intro;
