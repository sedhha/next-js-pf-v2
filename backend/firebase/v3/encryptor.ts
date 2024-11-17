import { store } from '@/firebase/index';

interface IEncryptedData {
	accessor: string;
}

const collectionName = 'encrypted_data';
export const handleFirebaseEncryption = async (
	op: string,
	key: string,
	encryptedString?: string
) => {
	if (op === '' || key === '')
		return { error: true, message: 'Invalid Operation - Key not found' };
	if (op.toLowerCase() === 'get')
		return getEncryptedString(key)
			.then((result) => ({ json: { encryptedKey: result }, error: false }))
			.catch((error) => ({ error: true, message: error.message }));
	else if (op.toLowerCase() === 'update' && encryptedString)
		return updateEncryptedString(encryptedString, key)
			.then(() => ({ error: false }))
			.catch((error) => ({ error: true, message: error.message }));
	else return { error: true, message: 'Invalid Operation' };
};

const getEncryptedString = async (key: string): Promise<string> =>
	store
		.collection(collectionName)
		.doc(key)
		.get()
		.then((doc) => {
			return (doc.data() as IEncryptedData).accessor;
		});

const updateEncryptedString = async (
	encrypted: string,
	key: string
): Promise<string> => {
	return store
		.collection(collectionName)
		.doc(key)
		.set({ accessor: encrypted })
		.then(() => '');
};
