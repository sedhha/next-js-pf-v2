import React from 'react';
import classes from './Rating.module.css';
import Icon, { icons } from '../../../../common/Icons/index';
type Props = {
	rating: number;
};

const totalStars = 5;
export default function Rating({ rating }: Props) {
	return (
		<div className={classes.Rating}>
			{Array(totalStars)
				.fill(0)
				.map((_, star) => {
					const className = `${
						rating >= star + 1 ? classes.Active : classes.Inactive
					}`;
					return (
						<Icon iconKey={icons.AiFillStar} className={className} key={star} />
					);
				})}
		</div>
	);
}
