import attributes from '@/constants/header-attr.json';
import clickActions from '@/constants/click-actions.json';
export type { IBlogCardProps } from './blogs';
export type { IDateFormatProps } from './dates';
export type AttributeValue = (typeof attributes)[keyof typeof attributes];
export type ClickActionAttributes =
	(typeof clickActions)[keyof typeof clickActions];
