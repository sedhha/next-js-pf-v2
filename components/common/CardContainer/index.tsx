import React from 'react';
import Card from '@/components/common/CardContainer/CardWithDescription';
import classes from './WorkExperienceContainer.module.css';

type Props = {
	cards: {
		key: string;
		image: string;
		employerTitle: string;
		paras: string;
		date: string;
	}[];
	curr: number;
};

export default function WorkExperienceContainer({ cards, curr }: Props) {
	return (
		<div className={classes.WorkExperienceContainer}>
			{cards.slice(curr, curr + 3).map((card) => (
				<Card {...card} key={card.key} />
			))}
		</div>
	);
}
