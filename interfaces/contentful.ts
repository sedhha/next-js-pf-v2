export interface IContentfulResponse<T> {
	data: {
		output: {
			total?: number;
			items: T[];
		};
	};
}

export interface ICFWorkExperience {
	orgName: string;
	designation: string;
	startDate: string;
	endDate?: string;
	currentOrg: boolean;
	image: {
		url: string;
	};
	description: string;
}
