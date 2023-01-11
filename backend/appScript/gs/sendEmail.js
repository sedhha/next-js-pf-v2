const sendEmail = ({
	searchString,
	to,
	subject,
	body,
	htmlBody,
	bccs,
	name
}) => {
	if (searchString) {
		const threads = GmailApp.search(searchString, 0, 1);
		if (threads && threads.length) {
			const [thread] = threads;
			thread.reply(body ?? 'incapable of HTML', {
				htmlBody: htmlBody,
				noReply: true
			});
		} else
			GmailApp.sendEmail(to, subject, body ?? 'incapable of HTML', {
				htmlBody,
				noReply: true,
				bcc: bccs,
				name
			});
	} else
		GmailApp.sendEmail(to, subject, body ?? 'incapable of HTML', {
			htmlBody,
			noReply: true,
			bcc: bccs,
			name
		});
};

const testConfig = () => {
	sendEmail({
		searchString: 'shivam-sahil-web-app-123dwde',
		to: 'activity.schoolsh2@gmail.com',
		subject: 'shivam-sahil-web-app-123dwde',
		body: 'Hello World -02',
		htmlBody: '<h1>Hello World -02</h1>',
		bccs:
			'activity.schoolsh@gmail.com,samsimons099@gmail.com,activity.schoolsh2@gmail.com',
		name: 'Shivam Sahil - Forum'
	});
};
