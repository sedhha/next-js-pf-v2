export interface IContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}
export interface IChat {
	uri: string;
	id: string;
	isFromAdmin: boolean;
	message: string;
}