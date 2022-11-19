import * as React from 'react';

interface ILazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const LazyImage: React.FunctionComponent<ILazyImageProps> = (props) => {
	return <img {...props} />;
};

export default LazyImage;
