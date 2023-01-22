import { IContactForm } from '@/interfaces/firebase';
import { IResponse } from '@/interfaces/api';
import { store } from '@/firebase/index';
import { getCollectionPath, storeCollectionPaths } from '@/firebase/constants';
import { ITotal } from '@/interfaces/api';

interface IContactParams {
	limit: number;
	skip: number;
}

export const getForms = async ({
	limit,
	skip
}: IContactParams): Promise<ITotal<IContactForm>> => {
	const feedbackPath = getCollectionPath(storeCollectionPaths.feedback);
	const { length } = await store.collection(feedbackPath).listDocuments();
	if (!length)
		return {
			total: length,
			items: []
		};
	if (skip > length)
		return {
			total: length,
			items: []
		};
	const items = await store
		.collection(feedbackPath)
		.offset(skip)
		.limit(limit)
		.get();
	if (items.empty)
		return {
			total: length,
			items: []
		};
	else
		return {
			total: length,
			items: items.docs.map((doc) => doc.data() as IContactForm)
		};
};
