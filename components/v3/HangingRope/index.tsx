import classes from './HangingRope.module.css';
import { useState, useEffect } from 'react';
const HangingRope = () => {
	const [ropeClass, setRopeClass] = useState(classes.rope);
	const onRopePull = () => {
		setRopeClass(classes.rope + ' ' + classes.ropePulled);
		setTimeout(() => setRopeClass(classes.rope), 1500);
	};
	useEffect(() => {
		console.log({ ropeClass });
	}, [ropeClass]);
	return (
		<div className={classes.container}>
			<section className={ropeClass} />
			<div className={classes.bulb} onClick={onRopePull} />
		</div>
	);
};

export default HangingRope;
