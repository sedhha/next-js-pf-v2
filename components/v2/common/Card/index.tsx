import React from 'react';
import LazyImage from '@/v2/common/LazyImage';
import { IActionButton } from '@/interfaces/projects';
import { useAppDispatch } from '@/redux/hooks';
import { onClickEvent } from '@/slices/analytics.slice';
import clickActions from '@/constants/click-actions.json';

type Props = {
	className: string;
	imgClassName: string;
	imgSrc: string;
	h1Text: string;
	h2Text?: string;
	h3Text?: string;
	actionButtons?: IActionButton[];
	pText: string;
};

const Work = ({
	className,
	imgClassName,
	imgSrc,
	h1Text,
	h2Text,
	h3Text,
	actionButtons,
	pText
}: Props) => {
	const dispatch = useAppDispatch();
	const dispatchOnDetailClick = (details: IActionButton) =>
		dispatch(
			onClickEvent({
				attribute: clickActions.cardDetails,
				description: details.identifier,
				identifier1: details.cta,
				identifier2: details.label
			})
		);
	return (
		<div className={className}>
			<div className={imgClassName}>
				<LazyImage src={imgSrc} loadLazily />
			</div>
			<a href="https://www.google.com" target="_blank" rel="noreferrer">
				<h1>{h1Text}</h1>
			</a>
			{h2Text ? <h2>{h2Text}</h2> : null}
			{h3Text ? <h3>{h3Text}</h3> : null}
			{actionButtons ? (
				<section>
					{actionButtons.map((item, index) => (
						<a
							key={index}
							href={item.cta}
							target="_blank"
							rel="noreferrer"
							onClick={() => dispatchOnDetailClick(item)}
						>
							<h4>{item.label}</h4>
						</a>
					))}
				</section>
			) : null}
			<div>
				{(pText ?? '').split('\n').map((item, id) => (
					<p key={id}>{item}</p>
				))}
			</div>
		</div>
	);
};

export default Work;
