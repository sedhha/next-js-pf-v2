import { IExpectedData } from '@/components/v3/Encryptor/interfaces';
import CryptoJS from 'crypto-js';

export const base64 = {
	decode: (s: string) => Buffer.from(s, 'base64'),
	encode: (b: string) => Buffer.from(b).toString('base64')
};

export const encryptJSON = (json: object, key: string): string => {
	const encrypted = CryptoJS.AES.encrypt(JSON.stringify(json), key).toString();
	return base64.encode(encrypted);
};

export const decryptJSON = (encrypted: string, key: string): object => {
	try {
		const decrypted = base64.decode(encrypted).toString();
		const decryptedB64 = CryptoJS.AES.decrypt(decrypted, key).toString(
			CryptoJS.enc.Utf8
		);
		return JSON.parse(decryptedB64) as IExpectedData[];
	} catch {
		return {
			error: 'Decryption failed: Invalid key or corrupted data'
		};
	}
};
