import React from 'react';
import InfiniteContainer from '@/v2/common/InfiniteContainer';
import { InfiniteCardProps } from '@/interfaces/categories';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis/public';
import { ITotal } from '@/interfaces/api';
import { stdDateFormatter } from '@/utils/date-utils';
import { IVideoContent } from '../../interfaces/videos';
import classes from './Videos.module.css';
import attributes from '@/constants/header-attr.json';
import { useAppDispatch } from '@/redux/hooks';
import { updateActiveSection } from '@/slices/navigation.slice';
import { useRouter } from 'next/router';

const transformerFunction = (cards: IVideoContent[]): InfiniteCardProps[] =>
	cards.map((card) => ({
		img: card.id,
		avatarImg: card.authorAvatar,
		avatarTitle: card.author,
		title: card.title,
		excerpt: card.excerpt,
		date: stdDateFormatter(card.date),
		yt: card.yt,
		allowFullScreen: true,
		id: card.id
	}));

const limit = 6;

const VideoFunction = () => {
	const [total, setTotal] = React.useState<number | null>(null);
	const dispatch = useAppDispatch();
	const router = useRouter();

	React.useEffect(() => {
		dispatch(updateActiveSection(attributes.Videos));
	}, [dispatch]);

	const fetchVideos = React.useCallback(
		(skip: number) =>
			feFetch<ITotal<IVideoContent>>({
				url: `${PUBLIC_APIS.VIDEOS}?limit=${limit}&skip=${skip}`
			}).then((res) => {
				if (!res.error && res.json) {
					setTotal(res.json.total);

					return [...transformerFunction(res.json.items)];
				}
			}),
		[]
	);
	return (
		<InfiniteContainer
			mainHeading={'Tutorials and Workshops'}
			mainHeadingIdentifier={'Video Galery'}
			limit={limit}
			total={total}
			fetchDataCallback={fetchVideos}
			overwriteContainerClass={classes.Container}
			overwriteImageClass={classes.YTVideo}
			onCardClick={(url) => router.push(`videos/${url}`)}
		/>
	);
};

export default VideoFunction;
