export interface IWork {
	org: string;
	designation: string;
	img: string;
	description: string;
	startDate: number;
	endDate?: number;
	current?: boolean;
}
