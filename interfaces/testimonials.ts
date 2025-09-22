import { IconKeys } from '@/components/v2/common/Icons';

export interface ITestimonials {
	name: string;
	designation: string;
	content: string;
	img: string;
	contact: { identifier: IconKeys; url: string; isSvg: boolean }[];
}

export interface ISocialHandles {
	id: IconKeys;
	url: string;
	isSvg: boolean;
	platform?: string;
}
