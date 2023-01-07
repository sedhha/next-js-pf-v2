import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
	<section className={classes.SpinnerContainer}>
		<div className={classes.loader}>Loading...</div>
	</section>
);

export default Spinner;
