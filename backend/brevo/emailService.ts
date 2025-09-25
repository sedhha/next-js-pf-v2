import * as brevo from '@getbrevo/brevo';

interface IEmail {
	to: string;
	sender: string;
	subject: string;
	textContent?: string;
	htmlContent?: string;
}

if (!process.env.BREVO_API_KEY || !process.env.PERSONAL_EMAIL) {
	throw new Error('BREVO_API_KEY is not defined in environment variables');
}
export async function sendEmail(props: IEmail): Promise<boolean> {
	const apiInstance = new brevo.TransactionalEmailsApi();
	apiInstance.setApiKey(
		brevo.TransactionalEmailsApiApiKeys.apiKey,
		process.env.BREVO_API_KEY as string
	);

	const sendSmtpEmail = new brevo.SendSmtpEmail();

	sendSmtpEmail.subject = 'Contact Form Submission';
	sendSmtpEmail.to = [{ email: props.to, name: 'Shivam' }];
	sendSmtpEmail.sender = { email: 'yourverified@domain.com', name: 'Your App' };
	sendSmtpEmail.htmlContent = props.htmlContent;

	try {
		await apiInstance.sendTransacEmail(sendSmtpEmail);
		console.log('✅ Email sent:');
		return true;
	} catch (error) {
		console.error('❌ Email failed:', error);
		return false;
	}
}
