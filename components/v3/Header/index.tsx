import classes from './Header.module.css';
import DropDown from './Dropdown';
import VisibleHeaders from './VisibleHeaders';
import Logo from '@/v3/Header/Logo';
import HangingRope from '@/v3/HangingRope';
import RadioToggle from '@/v3/RadioToggle';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/hooks';
import { ImCross } from 'react-icons/im';
import { updateShowMore } from '@/slices/navigation.slice';
import { HiViewList } from 'react-icons/hi';

const Header = () => {
	const dispatch = useAppDispatch();
	const { showMore } = useAppSelector((state) => state.navigation);

	return (
		<header className={classes.Header}>
			<div className={classes.Title}>
				<Logo />
				<h1>Shivam Sahil.</h1>
			</div>
			<VisibleHeaders />
			<DropDown />
			<HangingRope />
			<RadioToggle />
			<div className={classes.MobileOnly}>
				{showMore ? (
					<ImCross
						className={classes.ShowMoreIcon}
						onClick={() => dispatch(updateShowMore(false))}
					/>
				) : (
					<HiViewList
						className={classes.ShowMoreIcon}
						onClick={() => dispatch(updateShowMore(true))}
					/>
				)}
			</div>
		</header>
	);
};

export default Header;
