const jsonToBase64 = (data: object) => {
	if (typeof data === 'object') {
		return btoa(JSON.stringify(data));
	}
	return btoa(data);
};
//const base;
