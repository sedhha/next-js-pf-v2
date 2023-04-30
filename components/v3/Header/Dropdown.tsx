import AnimateDown from '@/v3/AnimateDown';
import classes from './Header.module.css';
import { AiFillCaretDown } from 'react-icons/ai';
import headerElements from '@/constants/headers.json';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';

const DropDown = () => {
	const router = useRouter();
	const {
		staticContent: {
			navigations: { latestViewed }
		}
	} = useAppSelector((state) => state.analytics);
	const onChangeRoute = (url: string) => {
		router.push(`/#${url}`);
	};
	const indexOfActiveElement = headerElements.findIndex(
		(item) => item.value === latestViewed
	);
	const hiddenActiveElement = indexOfActiveElement > 4;
	return (
		<div
			className={[
				classes.dropdown,
				classes.NoDecoration,
				hiddenActiveElement ? classes.ActiveItem : null
			].join(' ')}
		>
			<h3>More</h3>
			<div className={classes.optionsWithArrow}>
				<AnimateDown>
					<>
						<section className={classes.arrowContainer}>
							<section className={classes.arrow} />
						</section>
						<div className={classes.options}>
							{headerElements.map((element) => (
								<h3
									key={element.value}
									className={
										element.value === latestViewed
											? classes.ActiveDropDownElement
											: undefined
									}
									onClick={() => onChangeRoute(element.value)}
								>
									{element.label}
								</h3>
							))}
						</div>
					</>
				</AnimateDown>
			</div>
			<AiFillCaretDown className={classes.down} />
		</div>
	);
};

export default DropDown;
