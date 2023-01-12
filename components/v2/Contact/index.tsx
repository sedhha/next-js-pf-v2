import React from 'react';
import classes from './Contact.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';
import VisibilityHandler from '@/v2/common/VisibilityController';
import attributes from '@/constants/header-attr.json';
import { println } from '@/utils/dev-utils';
import Input from '@/v2/common/Input';
import TextArea from '@/v2/common/Input/textarea';
import { IContactForm } from '@/interfaces/firebase/contact-form';
import { feFetch } from '@/utils/fe/fetch-utils';
import { IResponse } from '@/interfaces/api';
import { DB_APIS } from '@/utils/fe/apis/public';
import { regexExpressions } from '@/utils/regex-validators';

const ChatWindow = dynamic(() => import('./ChatWindow'));

const Contact = () => {
	const { inChatMode } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');

	const onSubmitContactForm = () => {
		const payload: IContactForm = { name, email, subject, message };
		feFetch<IResponse<null>>({
			url: `${DB_APIS.CONTACT}`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		}).then((res) => console.log(res));
	};

	return (
		<VisibilityHandler
			onVisibleCallback={() => println('contacts visible')}
			Component={
				<section className={classes.ContactForm} id={attributes.Contact}>
					<h1>Wave a hello or want me to build something cool for you ?</h1>
					<div className={classes.Form}>
						<section className={classes.FormSection}>
							<h1>Get In Touch</h1>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									pattern={regexExpressions.name}
									errorMessage="Name must only contain 2 or more alphabetic characters"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									pattern={regexExpressions.email}
									errorMessage="Invalid Email Address"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<Input
									placeholder="Subject"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									pattern={regexExpressions.subject}
									errorMessage="Subject must be atleast 10 characters long"
								/>
								<div />
							</div>
							<div className={classes.InputContainer}>
								<TextArea
									placeholder="Message"
									rows={4}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
								<div />
							</div>
							<div className={classes.ButtonContainer}>
								<button onClick={onSubmitContactForm}>Send</button>
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
			}
		/>
	);
};

export default Contact;
