import React from 'react';
import classes from './Videos.module.css';
import attributes from '@/constants/header-attr.json';
import { useAppDispatch } from '@/redux/hooks';
import { updateActiveSection } from '@/slices/navigation.slice';
import { useRouter } from 'next/router';
import Header from '@/v2/Header';
import YTPlayer from '@/v2/common/YTPlayer';
import { IVideoContent } from '@/interfaces/videos';
import { feFetch } from '@/utils/fe/fetch-utils';
import { PUBLIC_APIS } from '@/utils/fe/apis';
import Empty from '@/v2/common/Empty';

const VideoFunction = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { videoID } = router.query;
	const [videoDetails, setVideoDetails] = React.useState<IVideoContent | null>();

	React.useEffect(() => {
		dispatch(updateActiveSection(attributes.Videos));
	}, [dispatch]);

	React.useEffect(() => {
		feFetch<IVideoContent | null>({
			url: `${PUBLIC_APIS.TITLE_BY_VIDEO_ID}?videoID=${videoID}`
		}).then((res) => {
			if (res.json) {
				setVideoDetails(res.json);
			}
		});
	}, [videoID]);

	return (
		<div className={classes.FullVideoContainer}>
			<Header />
			{videoDetails ? (
				<>
					<h1 className={classes.VideoDetailsHeading}>{videoDetails.title}</h1>
					<YTPlayer
						videoID={videoID as string}
						containerClass={classes.FullScreenVideo}
					/>
				</>
			) : (
				<Empty message="Unable to Find the Video that you requested :?" />
			)}
		</div>
	);
};

export default VideoFunction;
