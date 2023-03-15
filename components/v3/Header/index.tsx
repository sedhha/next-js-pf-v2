import classes from './Header.module.css';
import DropDown from './Dropdown';
import VisibleHeaders from './VisibleHeaders';
import LazyImage from '@/v2/common/LazyImage';
const Header = () => {
	return (
		<header className={classes.Header}>
			<h1>Shivam Sahil.</h1>
			<DropDown />
			<VisibleHeaders />
			<LazyImage
				alt="Morpankh - Krishna"
				className={classes.LogoImage}
				src={'/morpankh.svg'}
			/>
		</header>
	);
};

export default Header;
