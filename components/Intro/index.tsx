import React from 'react';
import classes from './Intro.module.css';
export default function Introduction() {
	return (
		<div className={classes.IntroGrid}>
			<div className={classes.IntroHeader}>
				<h1 className={classes.IntroHeaderContent}>
					Artist By Birth, Engineer by Choice
				</h1>
			</div>
			<div className={classes.ImageContainer}>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={'/intro-image.png'}
					className={classes.Image}
					alt={'Shivam -Sahil: Developer'}
				/>
			</div>
			<h2 className={classes.IntroTagline}>I am a JavaScript Developer</h2>
			<div className={classes.IntroPara}>
				<h4>
					Working as a full time software engineer, I specialize in FERN Stack. I am
					also well versed with end to end application development, automated data
					processes and pipelines, chatbots and microservices.
				</h4>

				<h4>
					For me, the world is nothing more than a complex mathematical model
					embedded with tons of analytical functions and expressions which has been
					programmed by the almighty god who is probably the greatest mathematician
					and programmer of all time!
				</h4>
			</div>
			<div className={classes.ActionArea}>
				<button>Learn More</button>
			</div>
		</div>
	);
}