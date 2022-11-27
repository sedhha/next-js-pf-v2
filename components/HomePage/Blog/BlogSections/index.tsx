import React, { useMemo } from 'react';
import classes from './BlogSections.module.css';
import blogSections from '@/constants/blog-categories.json';
import { useAppSelector, useAppDispatch } from '../../../../redux/tools/hooks';
import {
	updateShowMore,
	updateActiveSlice,
	updateActiveBlogCategory
} from '@/slices/navigation.slice';
import { BiChevronDown } from 'react-icons/bi';
import { ILabel } from 'interfaces/labels.interfaces';

// http://localhost:3000#blog-sections/<blog-section-id></blog-section-id>
const moreElements: ILabel = {
	value: 'show-more',
	label: 'More'
};
const mutateMore = (moreSections: ILabel[], activeElement: string): ILabel => {
	const activeElementPresent = moreSections.find(
		(section) => section.value === activeElement
	);
	if (activeElementPresent)
		return {
			...moreElements,
			value: activeElement
		};
	return { ...moreElements };
};

const truncateExtra = (sections: ILabel[], activeElement: string): ILabel[] => {
	const maxAllowedElements = 4;

	if (sections.length <= maxAllowedElements) return sections;

	const [first, second, third, fourth, ...rest] = sections;
	return [first, second, third, fourth, mutateMore(rest, activeElement)];
};

export default function BlogSections() {
	const { activeBlogCategory } = useAppSelector((state) => state.navigation);
	const dispatch = useAppDispatch();
	const displaySections = useMemo(
		() => truncateExtra(blogSections, activeBlogCategory),
		[activeBlogCategory]
	);
	return (
		<div className={classes.BlogSections}>
			{displaySections.map((section, index) => {
				const isActive = section.value === activeBlogCategory;
				const isLastItem = displaySections.length === index + 1;
				return isLastItem ? (
					<div className={classes.ShowMoreContainer}>
						<h3
							key={section.value}
							onClick={() =>
								!isActive && dispatch(updateActiveBlogCategory(section.value))
							}
							className={`${classes.SectionElement} ${
								isActive
									? classes.SectionElement_active
									: classes.SectionElement_passive
							}`}
						>
							{section.label}
						</h3>
						<div className={classes.ShowMoreMenu}>
							<h3>Gaming</h3>
							<h3>Fun</h3>
							<h3>Fun</h3>
							<h3>Fun</h3>
							<h3>Fun</h3>
							<h3>Fun</h3>
						</div>
					</div>
				) : (
					<h3
						key={section.value}
						onClick={() =>
							!isActive && dispatch(updateActiveBlogCategory(section.value))
						}
						className={`${classes.SectionElement} ${
							isActive ? classes.SectionElement_active : classes.SectionElement_passive
						}`}
					>
						{section.label}
					</h3>
				);
			})}
		</div>
	);
}
