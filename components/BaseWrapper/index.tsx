import { useAppDispatch } from '@/redux/hooks';
import { updateCsrfToken, updateRevisitor } from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '../../utils/fe/fetch-utils';
import { AUTH_APIS } from '@/utils/fe/apis/public';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		const revisitor = +(localStorage.getItem('revisitor') ?? 0);
		if (revisitor === 0) localStorage.setItem('revisitor', '1');
		else localStorage.setItem('revisitor', `${revisitor + 1}`);
		dispatch(updateRevisitor(revisitor + 1));
		feFetch<{ result: string }>({
			url: AUTH_APIS.CSRF
		}).then((res) => {
			if (!res.error) {
				dispatch(updateCsrfToken(res.json?.result));
			}
		});
	}, [dispatch]);
	return (
		<React.Fragment>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Component.type {...Component.props} />
			<Popup />
		</React.Fragment>
	);
}
