import AnimateDown from '@/v3/AnimateDown';
import classes from './Header.module.css';
import { AiFillCaretDown } from 'react-icons/ai';

const DropDown = () => {
	return (
		<div className={classes.dropdown}>
			<h3>More</h3>
			<div className={classes.optionsWithArrow}>
				<AnimateDown>
					<>
						<section className={classes.arrowContainer}>
							<section className={classes.arrow} />
						</section>
						<div className={classes.options}>
							<h3>Contacts</h3>
							<h3>Projects</h3>
							<h3>Awards</h3>
							<h3>Videos</h3>
							<h3>Testimonials</h3>
						</div>
					</>
				</AnimateDown>
			</div>
			<AiFillCaretDown className={classes.down} />
		</div>
	);
};

export default DropDown;
