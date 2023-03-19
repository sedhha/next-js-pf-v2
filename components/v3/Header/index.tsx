import classes from './Header.module.css';
import DropDown from './Dropdown';
import VisibleHeaders from './VisibleHeaders';
import Logo from '@/v3/Header/Logo';
import HangingRope from '@/v3/HangingRope';
const Header = () => {
	return (
		<header className={classes.Header}>
			<div className={classes.Title}>
				<Logo />
				<h1>Shivam Sahil.</h1>
			</div>
			<VisibleHeaders />
			<DropDown />
			<HangingRope />
		</header>
	);
};

export default Header;
