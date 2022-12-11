import { pageSections } from '@/constants/index';
import React from 'react';
import classes from './Contact.module.css';
import GetInTouch from './GetInTouchForm';
import ChatDirectly from './ChatDirectly/index';

export default function Contact() {
	return (
		<section className={classes.Contact} id={pageSections.CONTACT}>
			<br />
			<div className={classes.ContactHeading}>
				<h1 className={classes.IntroHeaderContent}>
					Wave a hello or want me to build something cool for you?
				</h1>
			</div>
			<div className={classes.FormSection}>
				<div className={classes.FormFillArea}>
					<GetInTouch />
				</div>
				<div className={classes.FormChatArea}>
					<ChatDirectly />
				</div>
			</div>
		</section>
	);
}
