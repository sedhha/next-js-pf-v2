import React from 'react';
import styles from './Encryptor.module.css';

interface IJsonViewerProps {
	json: object;
	encryptionKey?: string;
}

const JsonViewer = ({ json, encryptionKey }: IJsonViewerProps) => {
	if (!encryptionKey) return <p>Begin Decoding</p>;
	const formatJson = (data: object) => {
		return JSON.stringify(data, null, 2);
	};

	return <pre>{formatJson(json)}</pre>;
};

export { JsonViewer };
