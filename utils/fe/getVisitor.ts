const variableName = 'as-id';
interface IHardwareData {
	browserName: string;
	browserVersion: string;
	osName: string;
	osVersion: string;
}
const getBrowserData = (
	userAgent: string = navigator.userAgent
): IHardwareData => {
	const browserRegexList = [
		{ name: 'Edge', regex: /Edg\/([\d.]+)/i },
		{ name: 'Chrome', regex: /(?!Chrom.*OPR)Chrom(?:e|ium)\/([\d.]+)/i },
		{ name: 'Chrome', regex: /CriOS\/([\d.]+)/i },
		{ name: 'Firefox', regex: /Firefox\/([\d.]+)/i },
		{ name: 'IE', regex: /MSIE\s([\d.]+)/i },
		{ name: 'Opera', regex: /Opera\/([\d.]+)/i },
		{ name: 'Opera', regex: /OPR\/([\d.]+)/i },
		{ name: 'DuckDuckGo', regex: /DuckDuckGo\/([\d.]+)/i },
		{ name: 'Safari', regex: /Version\/([\d.]+).*Safari/i }
		// Add more browser names and their corresponding regular expressions as needed
	];

	const osRegexList = [
		{ name: 'Android', regex: /Android\s([\d.]+)/i },
		{ name: 'Windows', regex: /Windows NT ([\d.]+)/i },
		{ name: 'Mac OS', regex: /Mac OS X ([\d_]+)/i },
		{ name: 'Linux', regex: /Linux/i },
		{ name: 'iOS', regex: /iPhone OS ([\d_]+)/i }
		// Add more OS names and their corresponding regular expressions as needed
	];

	let browserName = 'Unknown';
	let browserVersion = '';
	let osName = 'Unknown';
	let osVersion = 'Unknown';

	for (const item of browserRegexList) {
		const match = userAgent.match(item.regex);
		if (match) {
			browserName = item.name;
			browserVersion = match[1];
			break;
		}
	}

	for (const item of osRegexList) {
		const match = userAgent.match(item.regex);
		if (match) {
			osName = item.name;
			alert(
				`Name: ${item.name}:: Regex::${
					item.regex
				}:: userAgent::${userAgent} match::${match.join(',')}`
			);
			osVersion = match?.[1]?.replace?.(/_/g, '.') ?? item.name;
			break;
		}
	}

	return {
		browserName,
		browserVersion,
		osName,
		osVersion
	};
};

const getCookie = (name: string) => {
	const cookies = document?.cookie?.split(';') ?? [];
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(`${name}=`)) {
			return cookie.substring(name.length + 1);
		}
	}
	return null;
};
const getUniqueBrowserID = () => {
	return localStorage?.getItem?.(variableName) ?? getCookie(variableName);
};

const setUniqueBrowserID = (value: string) =>
	{
		if (localStorage.setItem) localStorage.setItem(variableName, value);
		if (document.cookie)
			document.cookie = `${variableName}=${value}; Path=/; Max-Age=31536000`;
	}
export { getUniqueBrowserID, setUniqueBrowserID, getBrowserData };
