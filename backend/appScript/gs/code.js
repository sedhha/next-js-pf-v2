const doPost = (request = {}) => {
	const { _, postData: { contents, type } = {} } = request;
	let query = {};
	if (type === 'application/json') {
		query = JSON.parse(contents);
	} else if (type === 'application/x-www-form-urlencoded') {
		contents
			.split('&')
			.map((input) => input.split('='))
			.forEach(([key, value]) => {
				query[decodeURIComponent(key)] = decodeURIComponent(value);
			});
	} else if (type === 'text/plain') {
		try {
			query = JSON.parse(contents);
		} catch (e) {
			return ContentService.createTextOutput(
				JSON.stringify({
					error: true,
					statusCode: 400,
					msg: 'Unable to Parse JSON',
					type: type,
					requestBody: contents,
					payload: {}
				})
			).setMimeType(ContentService.MimeType.JSON);
		}
	} else
		return ContentService.createTextOutput(
			JSON.stringify({
				error: true,
				statusCode: 400,
				msg: 'Unknown Request Type',
				type: type,
				requestBody: contents,
				payload: {}
			})
		).setMimeType(ContentService.MimeType.JSON);

	const apiKey = query.apiKey;
	const isAuthenticated = authenticate({ apiKey });
	if (!isAuthenticated)
		return ContentService.createTextOutput(
			JSON.stringify({
				error: true,
				statusCode: 401,
				msg: 'User not authorized to make the Request.',
				type: type,
				requestBody: contents,
				payload: {}
			})
		).setMimeType(ContentService.MimeType.JSON);
	else
		return ContentService.createTextOutput(
			JSON.stringify({
				error: false,
				statusCode: 200,
				msg: 'Connection Established',
				type: type,
				requestBody: contents,
				payload: {}
			})
		).setMimeType(ContentService.MimeType.JSON);
};
