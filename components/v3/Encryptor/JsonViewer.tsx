import React from 'react';
import { IExpectedData, IJsonViewerProps } from './interfaces';

const JsonViewer = ({
	json,
	encryptionKey,
	maskPassword
}: IJsonViewerProps) => {
	if (!encryptionKey) return <p>Begin Decoding</p>;
	const formatJson = (data: IExpectedData[]) => {
		const maskedData = data.map((item) =>
			maskPassword ? { ...item, password: '*'.repeat(item.password.length) } : item
		);
		return JSON.stringify(maskedData, null, 2);
	};

	return <pre>{formatJson(json)}</pre>;
};

export { JsonViewer };
