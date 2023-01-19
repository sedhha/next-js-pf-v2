import { useAppDispatch } from '@/redux/hooks';
import {
	sendAnalytics,
	updateCsrfToken,
	updateGeoData,
	updateRevisitor
} from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
import Popup from '@/v2/common/Popup';
import { feFetch } from '@/utils/fe/fetch-utils';
import { AUTH_APIS } from '@/utils/fe/apis/public';
import { getGeoData } from '@/utils/fe/apis/analytics/geo';
import { closeAnalytics } from '@/slices/navigation.slice';
import { useAppSelector } from '../../redux/tools/hooks';
type Props = {
	Component: JSX.Element;
};

// Higher order initiator component

export default function BaseComponent({ Component }: Props) {
	const dispatch = useAppDispatch();
	const { geoData } = useAppSelector((state) => state.navigation);
	const onVisibilityChange = React.useCallback(() => {
		const isVisible = document.visibilityState === 'visible';
		const analyticsEnabled = JSON.parse(
			process.env.NEXT_PUBLIC_ANALYTICS_ENABLED ?? 'false'
		);
		if (analyticsEnabled) {
			if (isVisible) {
				feFetch<{ json: { result: string } }>({
					url: AUTH_APIS.CSRF
				}).then((res) => {
					if (!res.error) {
						dispatch(updateCsrfToken(res.json?.json.result));
					}
				});
				if (!geoData?.ip) {
					getGeoData().then((res) => {
						dispatch(updateGeoData(res));
						dispatch(sendAnalytics());
					});
				}
			} else dispatch(closeAnalytics());
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	React.useEffect(() => {
		const revisitor = +(localStorage.getItem('revisitor') ?? 0);
		if (revisitor === 0) localStorage.setItem('revisitor', '1');
		else localStorage.setItem('revisitor', `${revisitor + 1}`);
		dispatch(updateRevisitor(revisitor + 1));
	}, [dispatch]);
	React.useEffect(() => {
		onVisibilityChange();
		document.addEventListener('visibilitychange', onVisibilityChange);
		return () =>
			document.removeEventListener('visibilitychange', onVisibilityChange);
	}, [onVisibilityChange]);
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
