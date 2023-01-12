interface IForm {
    value: string;
    regex: string;
    message?: string;
}
export interface IRegexForm {
    [key: string]: IForm;
}

export interface IValidationResult {
    isValid: boolean;
    invalidKey?: string;
    invalidValue?: string;
    invalidMessage?: string;
}