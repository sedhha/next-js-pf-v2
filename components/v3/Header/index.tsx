import classes from './Header.module.css';
import DropDown from './Dropdown';
import VisibleHeaders from './VisibleHeaders';
const Header = () => {
	return (
		<header className={classes.Header}>
			<h1>Shivam Sahil.</h1>
			<DropDown />
			<VisibleHeaders />
		</header>
	);
};

export default Header;
