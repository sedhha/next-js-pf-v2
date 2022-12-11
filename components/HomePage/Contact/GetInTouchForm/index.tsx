import React from 'react';
import classes from './GetInTouch.module.css';
export default function GetInTouch() {
	return (
		<div className={classes.GetInTouchArea}>
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
				<textarea placeholder="Message" rows={5} />
				<div />
			</div>
			<div>
				<button className={`button ${classes.ButtonStyle}`}>Send</button>
			</div>
		</div>
	);
}
