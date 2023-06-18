// GET the IP Address

import { useEffect, useState } from 'react';
import { cacheFetch } from '@/utils/fe/cachedRequest';
import { HELPER_APIS } from '@/utils/fe/apis/public';
import { IFingerPrint } from '@/interfaces/analytics';
import {
	getBrowserData,
	getUniqueBrowserID,
	setUniqueBrowserID
} from '@/utils/fe/getVisitor';

interface IPData {
	ipAddress: string;
	continentCode: string;
	continentName: string;
	countryCode: string;
	countryName: string;
	stateProv: string;
	city: string;
}

interface DetailedIPData {
	ip: string;
	success: boolean;
	type: string;
	continent: string;
	continent_code: string;
	country: string;
	country_code: string;
	region: string;
	region_code: string;
	city: string;
	latitude: number;
	longitude: number;
	is_eu: boolean;
	postal: string;
	calling_code: string;
	capital: string;
	borders: string;
	flag: {
		img: string;
		emoji: string;
		emoji_unicode: string;
	};
	connection: {
		asn: number;
		org: string;
		isp: string;
		domain: string;
	};
	timezone: {
		id: string;
		abbr: string;
		is_dst: boolean;
		offset: number;
		utc: string;
		current_time: string;
	};
}

const useVisitorData = () => {
	const [userIP, setUserIP] = useState<string | null>(null);
	const [city, setCity] = useState<string | null>(null);
	const [continentCode, setContinentCode] = useState<string | null>(null);
	const [continentName, setContinentName] = useState<string | null>(null);
	const [countryCode, setCountryCode] = useState<string | null>(null);
	const [countryName, setCountryName] = useState<string | null>(null);
	const [stateProvince, setStateProvince] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState<IFingerPrint>({});
	useEffect(() => {
		cacheFetch<IPData>(HELPER_APIS.IP).then((res) => {
			const {
				ipAddress = null,
				city = 'unknown-city',
				continentCode = 'unknown-continent-code',
				continentName = 'unknown-continent-name',
				countryCode = 'unknown-country-code',
				countryName = 'unknown-country-name',
				stateProv = 'unknown-state-province'
			} = res ?? {};
			setUserIP(ipAddress);
			setCity(city);
			setContinentCode(continentCode);
			setContinentName(continentName);
			setCountryCode(countryCode);
			setCountryName(countryName);
			setStateProvince(stateProv);
		});
	}, []);

	useEffect(() => {
		if (userIP != null && navigator.userAgent)
			cacheFetch<DetailedIPData>(`${HELPER_APIS.IP_SERVER}`, true, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'x-client-ip': userIP
				}
			})
				.then(async (res) => {
					const { browserName, browserVersion, osName, osVersion } =
						getBrowserData();
					if (!res.success) {
						console.error(
							'Lookup option returns null on search. Failed to get IP details',
							res
						);
						setError(true);
						setLoading(false);
						return;
					}
					const visitorId =
						getUniqueBrowserID() ??
						(await cacheFetch<{ id: string }>(HELPER_APIS.ID, true, {
							headers: {
								'Content-Type': 'application/json',
								'Accept': 'application/json',
								'x-ms-request-header': Buffer.from(
									JSON.stringify({
										ua: navigator.userAgent,
										platform: navigator.platform,
										hwConcurrency: navigator.hardwareConcurrency,
										//@ts-ignore
										deviceMemory: window.clientInformation?.deviceMemory,
										mxTouchPoints: navigator.maxTouchPoints,
										pixelRatio: window.devicePixelRatio,
										//@ts-ignore
										eventCountSize: window.performance?.eventCounts?.size,
										//@ts-ignore
										jsHeapSize: window.performance?.memory?.jsHeapSizeLimit
									}),
									'utf-8'
								).toString('base64')
							}
						})
							.then(({ id }) => {
								if (id) {
									setUniqueBrowserID(id);
									return id;
								}
								console.error('No ID returned for the given request.');
								setError(true);
								setLoading(false);
								return '';
							})
							.catch((error) => {
								console.error('Unable to get Unique ID - ', error.message);
								setError(true);
								setLoading(false);
								return '';
							}));
					if (!visitorId) {
						console.error('Visitor ID not found - ', visitorId);
						setError(true);
						setLoading(false);
					}
					const fpData: IFingerPrint = {
						fp_browserName: browserName,
						fp_browserVersion: browserVersion,
						fp_OS: osName,
						fp_OSVersion: osVersion,
						fp_device: navigator.userAgent,
						fp_ip: userIP,
						fp_cityName: city ?? res.city ?? stateProvince,
						fp_continentName: continentName ?? res.continent,
						fp_continentCode: continentCode ?? res.continent_code,
						fp_country: countryName ?? res.country,
						fp_countryCode: countryCode ?? res.country_code,
						fp_latitude: res.latitude,
						fp_longitude: res.longitude,
						fp_postCode: res.postal,
						fp_timezone: `${res.timezone.id}::UTC${res.timezone.utc}`,
						visitorId
					};
					setData({ ...fpData });
					setLoading(false);
				})
				.catch((error) => {
					console.error('Unable to get IP Details - ', error.message);
					setError(true);
					setLoading(false);
				});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userIP]);
	return { data, isLoading, error };
};

export { useVisitorData };
