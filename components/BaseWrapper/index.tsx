import { useAppDispatch } from '@/redux/hooks';
import { updateRevisitor } from '@/slices/navigation.slice';
import { print } from '@/utils/dev-utils';
import React from 'react';
import { useAppSelector } from '../../redux/tools/hooks';

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
		if (window?.innerWidth) alert(window.innerWidth);
	}, []);
	return <Component.type {...Component.props} />;
}
