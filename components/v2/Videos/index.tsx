import React from 'react';
import classes from './Videos.module.css';
import VideoContainer from '@/v2/common/YTPlayer';
import VideoCard from './VideoCard';
import VisibilityHandler from '@/v2/common/VisibilityController/lite';
import attributes from '@/constants/header-attr.json';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { onNewSectionView } from '@/slices/analytics.slice';
import topVideos from '@/constants/cms-constants/featured-videos.json';
import { useRouter } from 'next/router';

const { highlighted, top4 } = topVideos;

const Videos = () => {
	const dispatch = useAppDispatch();

	const router = useRouter();
	return (
		<VisibilityHandler
			onVisibleCallback={() => dispatch(onNewSectionView(attributes.Videos))}
			Component={
				<section className={classes.BodyModule} id={attributes.Videos}>
					<section className={classes.FeaturedVideoSection}>
						<h1>Video Content</h1>
						<VideoContainer
							videoID={highlighted.id}
							containerClass={classes.VideoContainer}
						/>
						<h2>{highlighted.title}</h2>
						<p>{highlighted.excerpt}</p>
					</section>
					<section className={classes.SecondPart}>
						<div className={classes.VideoGrid}>
							{top4.map((video) => (
								<VideoCard key={video.id} id={video.id} title={video.title} />
							))}
						</div>
						<button
							className={classes.BlueButton}
							onClick={() => router.push('/videos')}
						>
							View All Videos
						</button>
					</section>
				</section>
			}
		/>
	);
};

export default Videos;
