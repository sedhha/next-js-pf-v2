import React from 'react';
import classes from './Contact.module.css';
import LazyImage from '@/v2/common/LazyImage';
import Circle from '@/v2/common/Circle';
import { useAppDispatch } from '@/redux/hooks';
import { updateInChatMode } from '@/slices/navigation.slice';

const Contact = () => {
	const dispatch = useAppDispatch();
	return (
		<section className={classes.ChatWindow}>
			<div className={classes.TopNavigation}>
				<h2>Chat Anonymously</h2>
				<h2 onClick={() => dispatch(updateInChatMode(false))}>X</h2>
			</div>
		</section>
	);
};

export default Contact;
