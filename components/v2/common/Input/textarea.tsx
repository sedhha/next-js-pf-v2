import { InputHTMLAttributes } from 'react';
import classes from './Input.module.css';
interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
	errorMessage?: string;
}
const TextArea = ({ errorMessage, ...rest }: InputProps) => (
	<div
		className={classes.InputBox}
		error-message={errorMessage ?? 'Invalid Input Provided'}
	>
		<textarea {...rest} />
	</div>
);
export default TextArea;
