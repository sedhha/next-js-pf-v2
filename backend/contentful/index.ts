/*
curl 'https://graphql.contentful.com/content/v1/spaces/eowwrv5buqcq/environments/master' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://033bad1b-c8e2-4ee5-b8f8-f4c19c33ca37.ctfcloud.net' -H 'Authorization: Bearer x6cYdXasSQZ7kU31GHsalXGJa1kZsVcWK2gQIRGrom4' --data-binary '{"query":"query($limit:Int!,$skip:Int!) {\n workExperienceCollection(limit:$limit,skip:$skip) {\n  items {\n    orgName\n    designation\n    startDate\n    currentOrg\n    image {\n      url\n    }\n    description\n  }\n}\n}","variables":{"limit":20,"skip":1}}' --compressed
*/
import fetch from 'node-fetch';
import { workExperienceQuery } from './query';
import { ITotal } from '@/interfaces/api';
import { IWork } from '@/interfaces/work';
import {
	ICFWorkExperience,
	IContentfulResponse
} from '@/interfaces/contentful';

const standarizeContentfulWorkExperience = (
	data: IContentfulResponse<ICFWorkExperience>
): ITotal<IWork> => ({
	total: data.data.output.total ?? 0,
	items: data.data.output.items.map(
		(item) =>
			({
				org: item.orgName,
				designation: item.designation,
				current: item.currentOrg,
				img: item.image.url,
				description: item.description,
				startDate: new Date(item.startDate).getTime(),
				...(item.endDate && { endDate: new Date(item.endDate).getTime() })
			} as IWork)
	)
});
const queryWorkExperience = async (
	limit: number,
	skip: number
): Promise<ITotal<IWork>> => {
	if (!process.env.CONTENTFUL_BASE_URL || !process.env.CONTENTFUL_ACCESS_TOKEN) {
		throw new Error(
			'Unable to get Work Experience Data. Database URL not found or Authentication Failed'
		);
	}
	return fetch(process.env.CONTENTFUL_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Connection': 'keep-alive',
			'Authorization': 'Bearer ' + process.env.CONTENTFUL_ACCESS_TOKEN
		},
		body: JSON.stringify({
			query: workExperienceQuery,
			variables: {
				limit,
				skip
			}
		})
	}).then((res) =>
		res.json().then((data) => {
			return standarizeContentfulWorkExperience(
				data as IContentfulResponse<ICFWorkExperience>
			);
		})
	);
};

export { queryWorkExperience };
