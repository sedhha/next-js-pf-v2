import classes from './Header.module.css';
import DropDown from './Dropdown';
const Header = () => {
	return (
		<header className={classes.Header}>
			<h1>Shivam Sahil.</h1>
			<DropDown />
		</header>
	);
};

export default Header;
