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
	setNewKey: (value: string) => void;
	newValue: string;
	setNewValue: (value: string) => void;
	newDescription: string;
	setNewDescription: (value: string) => void;
	number: string;
	setPhoneNumber: (value: string) => void;
	createNewPair: () => void;
	isLast: boolean;
	removeThisPair: (num: number) => void;
	index: number;
}

interface INewPair {
	addNewPair: boolean;
	newPairs: IExpectedData[];
	setNewPairs: (value: IExpectedData[]) => void;
	createNewPair: () => void;
	removeThisPair: (num: number) => void;
	editInJson: boolean;
}

type INewPairWithoutEdit = Omit<INewPair, 'editInJson' | 'addNewPair'>;

interface IJsonProps {
	json: IExpectedData[];
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
