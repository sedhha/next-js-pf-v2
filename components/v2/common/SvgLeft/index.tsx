import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
	fillColor?: string;
}
const SvgLeft = ({ fillColor, ...props }: Props) => (
	<svg
		width={80}
		height={140}
		viewBox="0 0 80 128"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M27.556 63.6667H0L59.3333 126.667V97.4073L27.556 63.6667ZM59.3333 0.666656L0 63.6667H27.556L59.3333 29.926V0.666656Z"
			fill={fillColor ?? '#F27304'}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M57.5534 63.6667H38.6667L79.3333 105.333V85.982L57.5534 63.6667ZM79.3333 22L38.6667 63.6667H57.5534L79.3333 41.3513V22Z"
			fill={fillColor ?? '#F27304'}
		/>
	</svg>
);

export default SvgLeft;
