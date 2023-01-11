const transformListToMap = (list) =>
	list.reduce((acc, curr, index) => {
		if (index === 0) return acc;
		const [key, value] = curr;
		acc[key] = value;
		return acc;
	}, {});

const getConfig = () => {
	const sheet = SpreadsheetApp.openById(config.sheetID);
	const tab = sheet.getSheetByName(config.configSheetName);
	const lastRow = tab.getLastRow();
	const list = tab.getRange(1, 1, lastRow, 2).getValues();
	const map = transformListToMap(list);
	return map;
};

const authenticate = ({ apiKey }) => {
	const configValues = getConfig();
	return apiKey === configValues[config.apiAccess];
};
