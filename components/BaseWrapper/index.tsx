import { useAppDispatch } from '@/redux/hooks';
import { updateRevisitor } from '@/slices/navigation.slice';
import React from 'react';

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
	return <Component.type {...Component.props} />;
}
