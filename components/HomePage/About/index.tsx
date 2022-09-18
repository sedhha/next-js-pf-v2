import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import classes from './About.module.scss';

export default function AboutSection() {
  const { darkMode } = useAppSelector((state) => state.ui);
  return (
    <div className={classes.AboutWrapper}>
      <div className={classes.About}>
        <h1 className={classes.Header}>Artist By Birth, Engineer By Choice</h1>
        <div className={classes.PublicImageContainer}>
          <img
            className={classes.PublicImage}
            src='/homepage/public-image.png'
            alt='Shivam Sahil - Developer'
          />
        </div>
        <h2
          className={[classes.Title, darkMode ? classes.Title_Dark : null].join(
            ' '
          )}>
          I am a{' '}
          <span className={classes.Title_Highlight}>JavaScript Developer</span>
        </h2>
        <div className={classes.Description}>
          <p
            className={[
              classes.Description_Para,
              darkMode ? classes.Description_Para_Dark : null,
            ].join(' ')}>
            Working as a full time software engineer, I specialize in{' '}
            <a
              className={classes.Description_Para_Highlight}
              href='https://www.geeksforgeeks.org/mern-stack/'
              target='_blank'>
              MERN Stack
            </a>
            . I am also well versed with end to end application development,
            automated data processes and pipelines, chatbots and microservices.
          </p>
          <p
            className={[
              classes.Description_Para,
              darkMode ? classes.Description_Para_Dark : null,
            ].join(' ')}>
            For me, the world is nothing more than a complex mathematical model
            embedded with tons of analytical functions and expressions which has
            been programmed by the almighty god who is probably the greatest
            mathematician and programmer of all time!
          </p>
        </div>
        <div className={classes.LearnMore}>
          <button className={classes.ResponsiveButton}>Learn More</button>
        </div>
      </div>
    </div>
  );
}
