import nodemailer from 'nodemailer';

if (
	!process.env.GMAIL_USER ||
	!process.env.GMAIL_APP_PASS ||
	!process.env.TO_USER
) {
	throw new Error(
		'GMAIL_USER and GMAIL_APP_PASS environment variables are required'
	);
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER, // your Gmail
		pass: process.env.GMAIL_APP_PASS // app password
	}
});

export async function sendEmail(to: string, subject: string, html: string) {
	await transporter.sendMail({
		from: `"GZB Services" <${process.env.GMAIL_USER}>`,
		to,
		subject,
		html
	});
}
