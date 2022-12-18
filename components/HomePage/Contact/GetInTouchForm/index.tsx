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
				<textarea placeholder="Message" rows={4} />
				<div />
			</div>
			<div className={classes.ButtonContainer}>
				<button className={`button ${classes.ButtonStyle}`}>Send</button>
			</div>
		</div>
	);
}
