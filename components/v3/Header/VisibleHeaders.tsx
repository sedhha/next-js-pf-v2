import classes from './Header.module.css';

const VisibleHeaders = () => {
	return (
		<div className={classes.visibleHeaders}>
			<h2>About</h2>
			<h2>Work Experience</h2>
			<h2>Blogs</h2>
		</div>
	);
};

export default VisibleHeaders;
