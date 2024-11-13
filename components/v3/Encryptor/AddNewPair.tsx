import styles from './Encryptor.module.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons library

interface IAddNewPairProps {
	newKey: string;
	setNewKey: (value: string) => void;
	newValue: string;
	setNewValue: (value: string) => void;
	createNewPair: () => void;
	isLast: boolean;
	removeThisPair: (num: number) => void;
	index: number;
}

const AddNewPair = ({
	newKey,
	setNewKey,
	newValue,
	setNewValue,
	createNewPair,
	removeThisPair,
	isLast,
	index
}: IAddNewPairProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<>
			<div className={styles.inputGroup}>
				<label>New Key:</label>
				<input
					type="text"
					value={newKey}
					onChange={(e) => setNewKey(e.target.value)}
					className={styles.input}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label>New Value:</label>
				<div className={styles.passwordWrapper}>
					<input
						type={showPassword ? 'text' : 'password'}
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						className={styles.input}
					/>
					<span onClick={togglePasswordVisibility} className={styles.eyeIcon}>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				</div>
			</div>

			{!isLast && (
				<button className={styles.button} onClick={() => removeThisPair(index)}>
					Remove this Field
				</button>
			)}

			{isLast && (
				<button className={styles.button} onClick={createNewPair}>
					Add New
				</button>
			)}
		</>
	);
};

export { AddNewPair };
