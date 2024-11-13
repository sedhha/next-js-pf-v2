import React, { useEffect, useState } from 'react';
import { JsonViewer } from './JsonViewer';
import { AddNewPair } from './AddNewPair';
import styles from './Encryptor.module.css';
import { NewPair } from './NewPairs';
import { feFetch } from '@/utils/fe/fetch-utils';
import { decryptJSON, encryptJSON } from '@/utils/fe/encryption';

const EncryptorPage = () => {
	const [data, setData] = useState<Record<string, string | undefined>>({});
	const [address, setAddress] = useState<string>('');
	const [addedData, setAddedData] = useState<Record<string, string | undefined>>(
		{}
	);
	const [encryptionKey, setEncryptionKey] = useState('');
	const [addNewKey, setAddNewKey] = useState(false);
	const [encryptedJson, setEncryptedJson] = useState<string>('');
	const [newKeys, setNewKeys] = useState<{ key: string; value: string }[]>([
		{ key: '', value: '' }
	]);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const pullMyData = () => {
		feFetch({
			url: `/api/public/get-encrypted-data?method=get&keyField=${address}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'Mozilla/5.0'
			}
		}).then((res) => {
			if (res.error) {
				setErrorMessage(res.message ?? '');
			} else {
				setErrorMessage('');
				const result = (res.json as { encryptedKey: string }).encryptedKey;
				setEncryptedJson(result ?? '');
				const decryptedData = decryptJSON(result, encryptionKey);

				setData({ ...decryptedData, error: undefined });
			}
		});
	};
	const createNewPair = () => {
		setNewKeys([...newKeys, { key: '', value: '' }]);
	};
	const removeThisPair = (index: number) => {
		const updatedPairs = newKeys.filter((_, i) => i !== index);
		setNewKeys(updatedPairs);
	};

	const resetState = (newJson: Record<string, string | undefined>) => {
		setData({ ...newJson });
		setAddedData({});
		setNewKeys([{ key: '', value: '' }]);
		setAddNewKey(false);
	};

	// Handle encryption preview
	const uploadToCloud = async () => {
		const newJson = { ...data, ...addedData };
		const encrypted = encryptJSON(newJson, encryptionKey);
		feFetch({
			url: `/api/public/get-encrypted-data?method=update&keyField=${address}&encryption=${encrypted}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'Mozilla/5.0'
			}
		})
			.then((res) => {
				if (res.error) {
					setErrorMessage(res.message ?? '');
					setSuccessMessage('');
				} else {
					setErrorMessage('');
					setSuccessMessage('Successfully uploaded to cloud');
				}
			})
			.finally(() => {
				resetState(newJson);
			});
	};
	const updatedJSON = () => {
		const updatedData = { ...data };
		delete updatedData.error;
		newKeys.forEach((pair) => {
			updatedData[pair.key] = pair.value;
		});
		setAddedData(updatedData);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Synopsis</h1>
			<br />
			<div className={styles.inputGroup}>
				<label>
					Encryption Key (Please keep a strong and highly secure encryption key):
				</label>
				<input
					type="text"
					value={encryptionKey}
					onChange={(e) => setEncryptionKey(e.target.value)}
					className={styles.input}
				/>
			</div>
			<br />

			<div className={styles.inputGroup}>
				<label>
					Address (Any random address, should be unique or else you will end up
					writing to someone else secret):
				</label>
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					className={styles.input}
				/>
			</div>
			<br />
			<div className={styles.buttonGroup}>
				{!addNewKey && (
					<button
						onClick={() => setAddNewKey((prev) => !prev)}
						className={styles.button}
					>
						Add Key-Value Pair
					</button>
				)}

				<button onClick={pullMyData} className={styles.button}>
					Pull my data
				</button>

				{addNewKey && (
					<button
						className={styles.button}
						onClick={() => {
							setAddNewKey(false);
							updatedJSON();
						}}
					>
						Preview Updated JSON
					</button>
				)}
				<button className={styles.button} onClick={() => setAddedData({})}>
					Reset Json
				</button>
				<button className={styles.button} onClick={uploadToCloud}>
					Upload JSON To Cloud
				</button>
			</div>
			<br />
			{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
			{successMessage && <p className={styles.successMessage}>{successMessage}</p>}
			<NewPair
				addNewPair={addNewKey}
				newPairs={newKeys}
				setNewPairs={setNewKeys}
				removeThisPair={removeThisPair}
				createNewPair={createNewPair}
			/>
			<br />
			<br />

			{/* Display Encrypted JSON Preview */}
			{encryptedJson && (
				<div className={styles.encryptedPreview}>
					<h2>Encrypted JSON Preview</h2>
					<pre>{encryptedJson}</pre>
				</div>
			)}

			{/* Display JSON */}
			<JsonViewer json={{ ...data, ...addedData }} encryptionKey={encryptionKey} />
		</div>
	);
};

export { EncryptorPage };
