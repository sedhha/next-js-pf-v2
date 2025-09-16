interface IExpectedData {
	password: string;
	description: string;
	email: string;
	number: string;
}

interface IJsonViewerProps {
	json: IExpectedData[];
	encryptionKey?: string;
	maskPassword: boolean;
}

interface IAddNewPairProps {
	newKey: string;
	// eslint-disable-next-line no-unused-vars
	setNewKey: (value: string) => void;
	newValue: string;
	// eslint-disable-next-line no-unused-vars
	setNewValue: (value: string) => void;
	newDescription: string;
	// eslint-disable-next-line no-unused-vars
	setNewDescription: (value: string) => void;
	number: string;
	// eslint-disable-next-line no-unused-vars
	setPhoneNumber: (value: string) => void;
	createNewPair: () => void;
	isLast: boolean;
	// eslint-disable-next-line no-unused-vars
	removeThisPair: (num: number) => void;
	index: number;
}

interface INewPair {
	addNewPair: boolean;
	newPairs: IExpectedData[];
	// eslint-disable-next-line no-unused-vars
	setNewPairs: (value: IExpectedData[]) => void;
	createNewPair: () => void;
	// eslint-disable-next-line no-unused-vars
	removeThisPair: (num: number) => void;
	editInJson: boolean;
}

type INewPairWithoutEdit = Omit<INewPair, 'editInJson' | 'addNewPair'>;

interface IJsonProps {
	json: IExpectedData[];
	// eslint-disable-next-line no-unused-vars
	setNewPairs: (value: IExpectedData[]) => void;
}

export type {
	IExpectedData,
	IAddNewPairProps,
	INewPair,
	IJsonViewerProps,
	INewPairWithoutEdit,
	IJsonProps
};
