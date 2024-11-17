import styles from './Encryptor.module.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons library
import { IAddNewPairProps } from './interfaces';

const AddNewPair = ({
	newDescription,
	setNewDescription,
	newKey,
	setNewKey,
	newValue,
	setNewValue,
	number,
	setPhoneNumber,
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
				<label>Description:</label>
				<input
					type="text"
					value={newDescription}
					onChange={(e) => setNewDescription(e.target.value)}
					className={styles.input}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label>Email:</label>
				<input
					type="text"
					value={newKey}
					onChange={(e) => setNewKey(e.target.value)}
					className={styles.input}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label>Number:</label>
				<input
					type="text"
					value={number}
					onChange={(e) => setPhoneNumber(e.target.value)}
					className={styles.input}
				/>
			</div>

			<div className={styles.inputGroup}>
				<label>Password:</label>
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

			<button className={styles.button} onClick={() => removeThisPair(index)}>
				Remove this Field
			</button>

			{isLast && (
				<>
					<br />
					<br />
					<button className={styles.button} onClick={createNewPair}>
						Add New
					</button>
				</>
			)}
		</>
	);
};

export { AddNewPair };
