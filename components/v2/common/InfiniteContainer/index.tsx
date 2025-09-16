import React from 'react';
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
	// eslint-disable-next-line no-unused-vars
	fetchDataCallback: (skip: number) => Promise<InfiniteCardProps[] | undefined>;
	limit: number;
	total: number | null;
	overwriteContainerClass?: string;
	overwriteImageClass?: string;
	// eslint-disable-next-line no-unused-vars
	onCardClick: (url: string) => void;
}

export default function InfiniteContainer({
	mainHeading,
	mainHeadingIdentifier,
	includeHeader,
	limit,
	fetchDataCallback,
	total,
	overwriteContainerClass,
	overwriteImageClass,
	onCardClick
}: IContainerProps) {
	const [skip, setSkip] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [cards, setCards] = React.useState<InfiniteCardProps[]>([]);
	const updateSkip = (forTop: boolean = true) => {
		if (forTop) {
			if (skip - limit >= 0) setSkip(skip - limit);
			else setSkip(0);
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
		<div className={classes.WholeBody}>
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
						<div className={overwriteContainerClass ?? classes.Container}>
							{loading && <Spinner />}
							{cards.map((item, index) => (
								<Card
									{...item}
									key={index}
									overwriteImageClass={overwriteImageClass}
									onCardClick={() => onCardClick?.(item.id)}
								/>
							))}
						</div>
					}
					onReachedTopCallback={updateSkip}
					onReachedBottomCallback={() => {
						updateSkip(false);
					}}
				/>
			)}
		</div>
	);
}
