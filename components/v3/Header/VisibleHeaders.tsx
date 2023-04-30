import { useRouter } from 'next/router';
import classes from './Header.module.css';
import headerElements from '@/constants/headers.json';
import { useAppSelector } from '@/redux/hooks';

const VisibleHeaders = () => {
	const {
		staticContent: {
			navigations: { latestViewed }
		}
	} = useAppSelector((state) => state.analytics);
	const router = useRouter();
	const onChangeRoute = (url: string) => {
		router.push(`/#${url}`);
	};
	const indexOfActiveElement = headerElements.findIndex(
		(item) => item.value === latestViewed
	);
	return (
		<div className={classes.visibleHeaders}>
			{headerElements.map((element, index) => {
				return (
					<h2
						key={element.value}
						className={[
							classes.HeaderElement,
							index === indexOfActiveElement ? classes.ActiveItem : null
						].join(' ')}
						onClick={() => onChangeRoute(element.value)}
					>
						{element.label}
					</h2>
				);
			})}
		</div>
	);
};

export default VisibleHeaders;
