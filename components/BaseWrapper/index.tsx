import { useAppDispatch } from '@/redux/hooks';
import { updateRevisitor } from '@/slices/navigation.slice';
import React from 'react';
import Head from 'next/head';
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
	}, [dispatch]);
	React.useEffect(() => {
		// if (window?.innerWidth)
		// 	alert(
		// 		`Width:${window.innerWidth} & Height: ${window.innerHeight} & ${
		// 			window.innerWidth / window.innerHeight
		// 		}`
		// 	);
	}, []);
	return (
		<React.Fragment>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Component.type {...Component.props} />
		</React.Fragment>
	);
}
