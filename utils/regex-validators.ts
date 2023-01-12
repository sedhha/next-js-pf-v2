import { IRegexForm, IValidationResult } from '@/interfaces/regex-validator';

export const regexExpressions = {
	name: '[a-zA-Z]{2,}',
	email: '[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}.[a-zA-Z]{2,4}',
	subject: '[a-zA-Z0-9 ]{10,}',
	message: '[a-zA-Z0-9 ]{10,}'
};

export const regexValidator = (data: IRegexForm): IValidationResult => {
	const keys = Object.keys(data);
	if (!keys || !keys.length)
		return {
			isValid: true
		};
	const invalidKey = keys.find((key) => {
		const { value, regex } = data[key];
		const regExp = new RegExp(`^${regex}$`);
		const result = !regExp.test(value);
		return result;
	});
	return {
		isValid: invalidKey ? false : true,
		invalidKey: invalidKey,
		invalidValue: data[invalidKey ?? -1]?.value,
		invalidMessage: data[invalidKey ?? -1]?.message
	};
};
