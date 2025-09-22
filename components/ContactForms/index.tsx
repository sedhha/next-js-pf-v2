import { ITotal } from '@/interfaces/api';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ADMIN_APIS } from '@/utils/fe/apis/public';
import { feFetch } from '@/utils/fe/fetch-utils';
import { useEffect, useState } from 'react';
import { IContactForm } from '../../interfaces/firebase/contact-form';
import { updatePopup } from '@/slices/navigation.slice';
import classes from './ContactForms.module.css';

const limit = 100;
const skip = 0;
const ContactForms = () => {
	const { isAdmin, idToken } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const [total, setTotal] = useState(100);
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState<IContactForm[]>([]);

	useEffect(() => {
		if (skip > total && items.length !== 0) return;
		if (isAdmin && idToken && !loading) {
			setLoading(true);
			feFetch<{ json: ITotal<IContactForm> }>({
				url: `${ADMIN_APIS.CONTACT_FORMS}?limit=${limit}&skip=${skip}`,
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + idToken
				}
			}).then((res) => {
				setLoading(false);
				if (res.json) {
					const {
						json: { total, items }
					} = res.json;
					setTotal(total);
					setItems([...items]);
				} else
					dispatch(
						updatePopup({
							type: 'error',
							title: 'Error while fetching contact forms!',
							description:
								res.message ?? 'Unexpected error while fetching contact forms'
						})
					);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAdmin, idToken, skip, limit, dispatch]);
	return loading ? (
		<p>Loading... Please Wait</p>
	) : (
		<>
			<h1 className={classes.Feedback}>Contact Feedback</h1>
			<div className={classes.Items}>
				{items?.length !== 0 ? (
					items.map((item, index) => (
						<div key={index}>
							<h4>Email: {item.email}</h4>
							<h5>Name: {item.name}</h5>
							<h6>Subject: {item.subject}</h6>
							<h6>Message: {item.message}</h6>
						</div>
					))
				) : (
					<p>No Forms Submitted yet</p>
				)}
			</div>
		</>
	);
};

export default ContactForms;
