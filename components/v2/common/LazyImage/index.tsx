/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import VisibilityHandler from '@/v2/common/VisibilityController';
import LazyLoader from './LazyLoader';

interface ILazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	loadLazily?: boolean;
	lazySrc?: string;
	onVisibleCallback?: () => void;
}

const LazyImage: React.FunctionComponent<ILazyImageProps> = ({
	loadLazily,
	lazySrc,
	onVisibleCallback,
	...rest
}) => {
	const [load, setLoad] = React.useState(false);
	React.useEffect(() => {
		return () => setLoad(false);
	}, []);
	return loadLazily ? (
		load ? (
			<img {...rest} />
		) : (
			<VisibilityHandler
				onVisibleCallback={() => setLoad(true)}
				visibilityThreshold={0.8}
				Component={
					<div {...rest}>
						<LazyLoader />
					</div>
				}
			/>
		)
	) : (
		<img {...rest} />
	);
};

export default LazyImage;
