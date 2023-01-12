import { IContactForm } from '@/interfaces/firebase';
import { IResponse } from '@/interfaces/api';
import { store } from '@/firebase/index';
import { getCollectionPath, storeCollectionPaths } from '@/firebase/constants';
import { regexValidator } from '@/utils/regex-validators';
import { IRegexForm } from '@/interfaces/regex-validator';
import { regexExpressions } from '@/utils/regex-validators';

const transformToRegexFormat = (formData: IContactForm): IRegexForm => {
	const { name, email, subject, message } = formData;
	return {
		name: {
			value: name,
			regex: regexExpressions.name,
			message: `${name} - Name must only contain 2 or more alphabetic characters`
		},
		email: {
			value: email,
			regex: regexExpressions.email,
			message: `${email} - Must be a valid email address`
		},
		subject: {
			value: subject,
			regex: regexExpressions.subject,
			message: `${subject} - Subject must only contain 10 or more alphanumeric characters`
		},
		message: {
			value: message,
			regex: regexExpressions.message,
			message: 'Message field must have atleast 10 or more alphanumeric characters'
		}
	};
};

export const uploadToStore = async (
	formData: IContactForm
): Promise<IResponse<null>> => {
	const regexData = transformToRegexFormat(formData);
	const validData = regexValidator(regexData);
	if (validData.isValid)
		return {
			error: false,
			statusCode: 201,
			message: 'Successfully Added Entry'
		};
	return {
		error: true,
		statusCode: 422,
		message: validData.invalidMessage
	};
	// const feedbackPath = getCollectionPath(storeCollectionPaths.feedback);
};
