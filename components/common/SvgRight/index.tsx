import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
	fillColor?: string;
}

const NavigateRight = ({ fillColor, ...rest }: Props) => (
	<svg
		width={80}
		height={127}
		viewBox="0 0 80 127"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...rest}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M52.0104 63.1405L79.3388 63.1405L20.4958 125.62V96.6023L52.0104 63.1405ZM20.4958 0.661163L79.3388 63.1404L52.0104 63.1404L20.4958 29.6784L20.4958 0.661163Z"
			fill={fillColor ?? '#F27304'}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M22.261 63.1405H40.9917L0.661133 104.463L0.661133 85.2715L22.261 63.1405ZM0.661133 21.8182L40.9917 63.1405H22.261L0.661133 41.0095L0.661133 21.8182Z"
			fill={fillColor ?? '#F27304'}
		/>
	</svg>
);

export default NavigateRight;
