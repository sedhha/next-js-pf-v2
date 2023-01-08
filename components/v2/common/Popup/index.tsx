import React from 'react';
import classes from './Popup.module.css';
import Icon, { icons } from '@/v2/common/Icons';

const popUpData = {
	type: 'error',
	title: 'Oops, something went wrong',
	description: 'Something went wrong'
};

const Popup = () => (
	<div className={classes.alert}>
		<h2 className={classes.Icon}>X</h2>
		<h1>Something Went Wrong!</h1>
		<div className={classes.ErrorMessage}>
			<p>
				<strong>Error:</strong> There was a problem with your submission. Please try
				again.
			</p>
		</div>
	</div>
);
export default Popup;
