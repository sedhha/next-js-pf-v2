import React from 'react';

interface Props
	extends React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	> {}

export default function ImageComponent(props: Props) {
	// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
	return <img {...props} />;
}
