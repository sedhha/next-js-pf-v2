import React from 'react';
import classes from './Contact.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';

const ChatWindow = dynamic(() => import('./ChatWindow'));

const Contact = () => {
	const { inChatMode } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	return (
		<section className={classes.ContactForm}>
			<h1>Wave a hello or want me to build something cool for you ?</h1>
			<div className={classes.Form}>
				<section className={classes.FormSection}>
					<h1>Get In Touch</h1>
					<div className={classes.InputContainer}>
						<input placeholder="Name" />
						<div />
					</div>
					<div className={classes.InputContainer}>
						<input placeholder="Email" type="email" />
						<div />
					</div>
					<div className={classes.InputContainer}>
						<input placeholder="Subject" />
						<div />
					</div>
					<div className={classes.InputContainer}>
						<textarea placeholder="Message" rows={4} />
						<div />
					</div>
					<div className={classes.ButtonContainer}>
						<button>Send</button>
					</div>
				</section>
				{inChatMode ? (
					<ChatWindow />
				) : (
					<section className={classes.ChatDirectlyForm}>
						<React.Fragment>
							<div className={classes.AvatarWithImage}>
								<LazyImage src={'/chat-icon.png'} />
								<Circle className={classes.Circle} />
							</div>
							<h3>Or</h3>
							<h2>Chat with me directly</h2>
							<button onClick={() => dispatch(updateInChatMode(true))}>
								Authenticate and Chat
							</button>
						</React.Fragment>
					</section>
				)}
			</div>
		</section>
	);
};

export default Contact;
