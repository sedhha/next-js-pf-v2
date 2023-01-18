import React from 'react';
import InfiniteContainer from '@/v2/common/InfiniteContainer';
import { InfiniteCardProps } from '@/interfaces/categories';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis/public';
import { ITotal } from '@/interfaces/api';
import { stdDateFormatter } from '@/utils/date-utils';
import { IVideoContent } from '../../interfaces/videos';
import classes from './Videos.module.css';

const transformerFunction = (cards: IVideoContent[]): InfiniteCardProps[] =>
	cards.map((card) => ({
		img: card.id,
		avatarImg: card.authorAvatar,
		avatarTitle: card.author,
		title: card.title,
		excerpt: card.excerpt,
		date: stdDateFormatter(card.date),
		yt: card.yt,
		allowFullScreen: true
	}));

const limit = 6;

const VideoFunction = () => {
	const [total, setTotal] = React.useState<number | null>(null);

	const fetchVideos = React.useCallback(
		(skip: number) =>
			feFetch<{ json: ITotal<IVideoContent> }>({
				url: `${PUBLIC_APIS.VIDEOS}?limit=${limit}&skip=${skip}`
			}).then((res) => {
				if (!res.error && res.json) {
					setTotal(res.json.json.total);

					return [...transformerFunction(res.json.json.items)];
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
		/>
	);
};

export default VideoFunction;
