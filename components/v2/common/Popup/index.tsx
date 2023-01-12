import React from 'react';
import classes from './Popup.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { hidePopup } from '@/slices/navigation.slice';

const Popup = () => {
	const { showPopup, popup } = useAppSelector((state) => state.navigation);
	const { type, title, description } = popup;
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		setTimeout(() => dispatch(hidePopup()), popup.timeout);
	}, [popup, dispatch]);

	return showPopup ? (
		<div
			className={`${
				type === 'success'
					? classes.success
					: type === 'pending'
					? classes.pending
					: classes.alert
			} ${classes.popup}`}
		>
			<h2 className={classes.Icon} onClick={() => dispatch(hidePopup())}>
				X
			</h2>
			<h1>{title}</h1>
			<div className={classes.ErrorMessage}>
				<p>
					<strong>{type}:</strong>
					{description}
				</p>
			</div>
		</div>
	) : null;
};
export default Popup;
