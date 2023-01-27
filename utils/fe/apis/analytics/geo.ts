import { IGeoAPI } from '@/interfaces/analytics';
import { HELPER_APIS } from '@/utils/fe/apis/public';

export const getGeoData = async (maxRetries = 3): Promise<IGeoAPI> => {
	if (maxRetries === 0)
		return {
			ip: 'Failed after 3 attempts',
			network: 'Failed after 3 attempts',
			version: 'Failed after 3 attempts',
			city: 'Failed after 3 attempts',
			region: 'Failed after 3 attempts',
			region_code: 'Failed after 3 attempts',
			country: 'Failed after 3 attempts',
			country_name: 'Failed after 3 attempts',
			country_code: 'Failed after 3 attempts',
			country_code_iso3: 'Failed after 3 attempts',
			country_capital: 'Failed after 3 attempts',
			country_tld: 'Failed after 3 attempts',
			continent_code: 'Failed after 3 attempts',
			in_eu: false,
			postal: 'Failed after 3 attempts',
			latitude: -1,
			longitude: -1,
			timezone: 'Failed after 3 attempts',
			utc_offset: 'Failed after 3 attempts',
			country_calling_code: 'Failed after 3 attempts',
			currency: 'Failed after 3 attempts',
			currency_name: 'Failed after 3 attempts',
			languages: 'Failed after 3 attempts',
			country_area: -1,
			country_population: -1,
			asn: 'Failed after 3 attempts',
			org: 'Failed after 3 attempts'
		};
	return fetch(HELPER_APIS.GEO).then((res) => {
		const error = res.status > 299;
		if (error) return getGeoData(maxRetries - 1);
		return res.json().then((data) => {
			const geoData = data as IGeoAPI;
			if (!geoData.ip) return getGeoData(maxRetries - 1);
			const result = {
				ip: geoData.ip ?? 'Undefined Field Returned from API',
				network: geoData.network ?? 'Undefined Field Returned from API',
				version: geoData.version ?? 'Undefined Field Returned from API',
				city: geoData.city ?? 'Undefined Field Returned from API',
				region: geoData.region ?? 'Undefined Field Returned from API',
				region_code: geoData.region_code ?? 'Undefined Field Returned from API',
				country: geoData.country ?? 'Undefined Field Returned from API',
				country_name: geoData.country_name ?? 'Undefined Field Returned from API',
				country_code: geoData.country_code ?? 'Undefined Field Returned from API',
				country_code_iso3:
					geoData.country_code_iso3 ?? 'Undefined Field Returned from API',
				country_capital:
					geoData.country_capital ?? 'Undefined Field Returned from API',
				country_tld: geoData.country_tld ?? 'Undefined Field Returned from API',
				continent_code:
					geoData.continent_code ?? 'Undefined Field Returned from API',
				in_eu: geoData.in_eu ?? false,
				postal: geoData.postal ?? 'Undefined Field Returned from API',
				latitude: geoData.latitude ?? -1,
				longitude: geoData.longitude ?? -1,
				timezone: geoData.timezone ?? 'Undefined Field Returned from API',
				utc_offset: geoData.utc_offset ?? 'Undefined Field Returned from API',
				country_calling_code:
					geoData.country_calling_code ?? 'Undefined Field Returned from API',
				currency: geoData.currency ?? 'Undefined Field Returned from API',
				currency_name: geoData.currency_name ?? 'Undefined Field Returned from API',
				languages: geoData.languages ?? 'Undefined Field Returned from API',
				country_area: geoData.country_area ?? -1,
				country_population: geoData.country_population ?? -1,
				asn: geoData.asn ?? 'Undefined Field Returned from API',
				org: geoData.org ?? 'Undefined Field Returned from API'
			};
			return result;
		});
	});
};
