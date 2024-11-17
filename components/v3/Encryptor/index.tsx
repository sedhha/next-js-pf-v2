import React, { useState } from 'react';
import { JsonViewer } from './JsonViewer';
import styles from './Encryptor.module.css';
import { NewPair } from './NewPairs';
import { feFetch } from '@/utils/fe/fetch-utils';
import { base64, decryptJSON, encryptJSON } from '@/utils/fe/encryption';
import { IExpectedData } from './interfaces';

const EncryptorPage = () => {
	const [address, setAddress] = useState<string>('');
	const [encryptionKey, setEncryptionKey] = useState('');
	const [addNewKey, setAddNewKey] = useState(false);
	const [encryptedJson, setEncryptedJson] = useState<string>('');
	const [newKeys, setNewKeys] = useState<IExpectedData[]>([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [editInJson, setEditInJson] = useState(false);
	const [maskPassword, setMaskPassword] = useState(true);

	const pullMyData = () => {
		const encodedKey = base64.encode(address);
		feFetch({
			url: `/api/public/get-encrypted-data?method=get&keyField=${encodedKey}`,
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
				if (!(decryptedData as { error: string }).error) {
					setNewKeys((newKeys) => [
						...(decryptedData as IExpectedData[]),
						...newKeys
					]);
				}
			}
		});
	};
	const createNewPair = () => {
		setNewKeys([
			...newKeys,
			{ email: '', password: '', description: '', number: '' }
		]);
	};
	const removeThisPair = (index: number) => {
		const updatedPairs = newKeys.filter((_, i) => i !== index);
		setNewKeys(updatedPairs);
	};

	const resetState = () => {
		setAddNewKey(false);
	};

	// Handle encryption preview
	const uploadToCloud = async () => {
		const encrypted = encryptJSON(newKeys, encryptionKey);
		const addressEncoded = base64.encode(address);
		feFetch({
			url: `/api/public/get-encrypted-data?method=update&keyField=${addressEncoded}&encryption=${encrypted}`,
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
				resetState();
			});
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
					type={showPassword ? 'text' : 'password'}
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
					type={showPassword ? 'text' : 'password'}
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					className={styles.input}
				/>
			</div>
			<br />
			<div className={styles.buttonGroup}>
				<button
					onClick={() => setShowPassword((show) => !show)}
					className={styles.button}
				>
					{showPassword ? 'Hide' : 'View'} My Credentials
				</button>
				{!addNewKey && (
					<button
						onClick={() => setAddNewKey((prev) => !prev)}
						className={styles.button}
					>
						Add Key-Value Pair
					</button>
				)}

				{addNewKey && (
					<button
						onClick={() => setAddNewKey((key) => !key)}
						className={styles.button}
					>
						Hide Edit Mode
					</button>
				)}

				<button onClick={pullMyData} className={styles.button}>
					Pull my data
				</button>
				<button className={styles.button} onClick={() => setNewKeys([])}>
					Reset Json
				</button>
				<button
					className={styles.button}
					onClick={() => setEditInJson((edit) => !edit)}
				>
					Edit in {editInJson ? 'Editor' : 'JSON'}
				</button>
				<button className={styles.button} onClick={uploadToCloud}>
					Upload JSON To Cloud
				</button>
				<button
					className={styles.button}
					onClick={() => setMaskPassword((mask) => !mask)}
				>
					{(maskPassword ? 'Unmask' : 'Mask') + ' password in JSON Preview'}
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
				editInJson={editInJson}
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
			<JsonViewer
				json={newKeys}
				encryptionKey={encryptionKey}
				maskPassword={maskPassword}
			/>
		</div>
	);
};

export { EncryptorPage };
