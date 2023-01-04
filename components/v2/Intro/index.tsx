import React from 'react';
import classes from './Intro.module.css';
import LazyImage from '@/v2/common/LazyImage';
import VisibilityHandler from '@/v2/common/VisibilityController';

const Intro = () => {
	return (
		<VisibilityHandler
			Component={
				<section className={classes.BodyModule}>
					<h1 className={classes.H1Main}>Artist By Birth, Engineer by Choice</h1>
					<h2 className={classes.Intro}>
						I am a <span>Full Stack Developer</span>
					</h2>
					<div className={classes.ImageContainer}>
						<LazyImage
							src={'/intro-image.jpeg'}
							className={classes.Image}
							alt={'Shivam -Sahil: Developer'}
						/>
					</div>
					<div className={classes.IntroPara}>
						<h4>
							Working as a full time software engineer, I specialize in FERN Stack. I
							am also well versed with end to end application development, automated
							data processes and pipelines, chatbots and microservices.
						</h4>

						<h4>
							For me, the world is nothing more than a complex mathematical model
							embedded with tons of analytical functions and expressions which has been
							programmed by the almighty god who is probably the greatest mathematician
							and programmer of all time!
						</h4>
					</div>
				</section>
			}
			onVisibleCallback={() => console.log('Its Visible')}
		/>
	);
};

export default Intro;
