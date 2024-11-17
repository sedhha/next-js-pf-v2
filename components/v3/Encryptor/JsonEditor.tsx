import { useState } from 'react';
import { IJsonProps } from './interfaces';
import styles from './Encryptor.module.css';
import { z } from 'zod';

const schema = z.array(
	z.object({
		password: z.string(),
		email: z.string(),
		description: z.string(),
		number: z.string()
	})
);

export const JsonEditor = ({ json, setNewPairs }: IJsonProps) => {
	const [updateJson, setUpdateJson] = useState(JSON.stringify(json, null, 2));
	const [error, setError] = useState(false);

	const onUpdate = () => {
		try {
			const isValid = schema.safeParse(JSON.parse(updateJson));
			if (isValid.success) {
				setNewPairs(isValid.data);
			}
			setError(!isValid.success);
		} catch (e) {
			setError(true);
		}
	};

	return (
		<>
			<button className={styles.button} onClick={onUpdate}>
				Update JSON
			</button>
			<br />
			{error && (
				<p className={styles.errorMessage}>
					Failed to change JSON as the JSON doesnt match expected schema
				</p>
			)}
			<br />
			<textarea
				className={styles.input}
				value={updateJson}
				rows={10}
				onChange={(e) => setUpdateJson(e.target.value)}
			/>
		</>
	);
};
