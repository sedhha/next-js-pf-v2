import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateShowMore } from '@/slices/navigation.slice';
import React from 'react';
import { BsJustify } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import classes from './ViewIcon.module.css';
import { motion } from 'framer-motion';

export default function ViewIcon() {
	const { showMore } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const toggleResults = (value: boolean) => dispatch(updateShowMore(value));
	return (
		<React.Fragment>
			<div className={classes.ShowMore}>
				{showMore && (
					<motion.div
						initial={{ rotateZ: -180 }}
						animate={{ rotateZ: 0 }}
						exit={{ rotateZ: 180 }}
						transition={{ type: 'spring', stiffness: 100, duration: 1 }}
					>
						<MdOutlineClose onClick={() => toggleResults(false)} />
					</motion.div>
				)}

				{!showMore && (
					<motion.div
						initial={{ rotateZ: 180 }}
						animate={{ rotateZ: 0 }}
						exit={{ rotateZ: -180 }}
						transition={{ type: 'spring', stiffness: 100, duration: 1 }}
					>
						<BsJustify onClick={() => toggleResults(true)} />
					</motion.div>
				)}
			</div>
		</React.Fragment>
	);
}
