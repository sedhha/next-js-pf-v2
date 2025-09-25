import fetch from 'node-fetch';
import { ISendEmail } from '../../interfaces/appscript';

const appScriptUri = `https://script.google.com/macros/s/${process.env.APPSCRIPT_INSECURE_DEPLOYMENT_ID}/exec`;

export const sendEmailNewsLetterToUsers = async (emailProps: ISendEmail) =>
	fetch(appScriptUri, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			apiKey: process.env.APPSCRIPT_API_KEY,
			opType: 'email',
			opProps: emailProps
		})
	}).then(async (res) => {
		return res
			.json()
			.then((data) => ({ msg: (data as { msg: string }).msg }))
			.catch(async (error) => {
				console.log('Error parsing response from AppScript:', error);
				try {
					const text = await res.text();
					console.log('Response text:', text);
				} catch (e) {
					console.log('Error reading response text:', e);
				}
				return { msg: 'Failed to parse response from AppScript' };
			});
	});
