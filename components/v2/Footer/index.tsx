import React from 'react';
import classes from './Footer.module.css';
import SocialIcons from '@/v2/common/SocialIcons/Conditional';
import Icon, { icons } from '@/v2/common/Icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updatePopup } from '@/slices/navigation.slice';
import { feFetch } from '@/utils/fe/fetch-utils';
import { ANALYTICS_APIS } from '@/utils/fe/apis/public';
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth';
import app from '@/fe-client/firebase';
import myHandles from '@/constants/handles.json';
import { ISocialHandles } from '@/interfaces/testimonials';

const auth = getAuth(app);

type Props = {
	lastBuild: string;
};

const Footer = ({ lastBuild }: Props) => {
	const dispatch = useAppDispatch();
	const { csrfToken } = useAppSelector((state) => state.navigation);
	const [loading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const onSubscribe = () => {
		if (!csrfToken) {
			dispatch(
				updatePopup({
					type: 'error',
					title: 'Something went wrong',
					description: 'Something went wrong. Kindly refresh the page and try again!'
				})
			);
			return;
		}
		if (loading) {
			return;
		}
		setLoading(true);
		dispatch(
			updatePopup({
				type: 'pending',
				title: 'Adding you to email Newsletter',
				timeout: 15000,
				description:
					'Please wait while I add you to my subscriptions list. Kindly note that once added, you also need to confirm verification by following the link sent to your email!'
			})
		);
		feFetch({
			url: `${ANALYTICS_APIS.SIGNUP}?email=${email}`,
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': csrfToken
			}
		})
			.then((res) => {
				if (res.error) {
					dispatch(
						updatePopup({
							type: 'error',
							title: 'Error subscribing to NewsLetter!',
							description: 'Failed to Subscribe to Newsletter. Error - ' + res.message
						})
					);
				} else {
					const actionCodeSettings = {
						url: window.location.origin,
						handleCodeInApp: true
					};
					sendSignInLinkToEmail(auth, email, actionCodeSettings)
						.then(() => {
							dispatch(
								updatePopup({
									type: 'success',
									title: 'Email Subscription Request Recieved!',
									timeout: 5000,
									description:
										'Kindly check your inbox and spam folder and click on the Sign In link to confirm your subscription!'
								})
							);
						})
						.catch((err) => {
							dispatch(
								updatePopup({
									type: 'error',
									title: 'Error Sending Verification Email! :(',
									description: 'Failed to Subscribe to Newsletter. Error -' + err.message
								})
							);
						});
				}
			})
			.catch((err) => {
				dispatch(
					updatePopup({
						type: 'error',
						title: 'Error subscribing to NewsLetter!',
						description: 'Failed to Subscribe to Newsletter. Error - ' + err.message
					})
				);
			})
			.finally(() => setLoading(false));
	};
	return (
		<footer className={classes.FooterModule}>
			<section className={classes.MyDetails}>
				<h1>Shivam Sahil</h1>
				<SocialIcons
					iconColorClass={classes.Icons}
					socialHandles={myHandles as ISocialHandles[]}
					openInNewTab
				/>

				<h2>© {new Date().getFullYear()} | All rights reserved</h2>
				<h2>
					🚀 Last build: <strong>{lastBuild}</strong>
				</h2>
			</section>
			<section className={classes.Subscribe}>
				<div className={classes.TextWithSymbol}>
					<h1>Keep up to date with my blogs and videos.</h1>
					<Icon iconKey={icons.AiOutlineMail} className={classes.MailIcon} />
				</div>
				<input
					placeholder="Enter your Email Address"
					className={classes.EmailInputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button onClick={onSubscribe}>Subscribe</button>
			</section>
		</footer>
	);
};

export default Footer;
