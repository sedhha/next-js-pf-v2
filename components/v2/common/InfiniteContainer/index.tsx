import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import Header from '@/v2/Header';
import InfiniteCardComponent from '@/v2/common/InfiniteCard';
import classes from './InfiniteContainer.module.css';
import Card from './Card';
import { InfiniteCardProps } from '@/interfaces/categories';
import Spinner from '@/v2/common/Spinner';
import Empty from '@/v2/common/Empty';

interface IContainerProps {
	mainHeading: string;
	mainHeadingIdentifier: string;
	includeHeader?: boolean;
	fetchDataCallback: (skip: number) => Promise<InfiniteCardProps[] | undefined>;
	limit: number;
	total: number | null;
}

export default function InfiniteContainer({
	mainHeading,
	mainHeadingIdentifier,
	includeHeader,
	limit,
	fetchDataCallback,
	total
}: IContainerProps) {
	const { darkMode } = useAppSelector((state) => state.navigation);
	const [skip, setSkip] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [cards, setCards] = React.useState<InfiniteCardProps[]>([]);
	const updateSkip = (forTop: boolean = true) => {
		if (forTop) {
			if (skip - limit >= 0) setSkip(skip - limit);
		} else if (skip + limit < (total ?? -1)) {
			setSkip(skip + limit);
		}
	};

	React.useEffect(() => {
		setLoading(true);
		fetchDataCallback(skip)
			.then((result) => {
				if (result) {
					setCards([...result]);
				}
			})
			.finally(() => setLoading(false));
	}, [fetchDataCallback, skip]);
	return (
		<div
			className={`${classes.WholeBody} ${darkMode ? 'darkMode' : 'lightMode'}`}
		>
			{!includeHeader && <Header />}
			<br />
			<h1 className={classes.Heading}>
				{mainHeadingIdentifier}: <strong>{mainHeading}</strong>
			</h1>
			{!cards.length ? (
				<Empty />
			) : (
				<InfiniteCardComponent
					Component={
						<div className={classes.Container}>
							{loading && <Spinner />}
							{cards.map((item, index) => (
								<Card {...item} key={index} />
							))}
						</div>
					}
					onReachedTopCallback={updateSkip}
					onReachedBottomCallback={() => updateSkip(false)}
				/>
			)}
		</div>
	);
}
