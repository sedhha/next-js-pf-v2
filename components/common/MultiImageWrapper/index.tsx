import React from 'react';
import LazyImage from '@/components/common/ImageUtility';
import classes from './MultiImageWrapper.module.css';

interface ILazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	images: string[];
}

const MultiImageWrapper = ({ images, ...rest }: ILazyImageProps) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);

	if (!images.length) return null;

	const handleSwap = () => {
		if (images.length <= 1) return;
		if (currentIndex === images.length - 1) {
			setCurrentIndex(0);
		} else setCurrentIndex(currentIndex + 1);
	};
	return (
		<React.Fragment>
			{images.map((image, index) => {
				return (
					<LazyImage
						key={image + index}
						{...rest}
						className={`${rest.className ?? ''} ${
							images[currentIndex] === image ? classes.EntryImage : classes.ExitImage
						}`}
						src={images[currentIndex]}
						onMouseLeave={handleSwap}
					/>
				);
			})}
		</React.Fragment>
	);
};

export default MultiImageWrapper;
