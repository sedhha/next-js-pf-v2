import { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string;
}
const Input = ({ errorMessage, ...rest }: InputProps) => (
	<div
		className={classes.InputBox}
		error-message={errorMessage ?? 'Invalid Input Provided'}
	>
		<input {...rest} />
	</div>
);
export default Input;
