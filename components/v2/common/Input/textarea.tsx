import { TextareaHTMLAttributes } from 'react';
import classes from './Input.module.css';
interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
