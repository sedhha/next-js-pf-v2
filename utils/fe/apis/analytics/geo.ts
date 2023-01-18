import { IGeoAPI } from '@/interfaces/analytics';
import { feFetch } from '@/utils/fe/fetch-utils';
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
	return feFetch<IGeoAPI>({
		url: HELPER_APIS.GEO
	}).then((res) => {
		if (!res.json || res.error) return getGeoData(maxRetries - 1);
		if (!res.json.ip) return getGeoData(maxRetries - 1);
		const result = {
			ip: res.json.ip ?? 'Undefined Field Returned from API',
			network: res.json.network ?? 'Undefined Field Returned from API',
			version: res.json.version ?? 'Undefined Field Returned from API',
			city: res.json.city ?? 'Undefined Field Returned from API',
			region: res.json.region ?? 'Undefined Field Returned from API',
			region_code: res.json.region_code ?? 'Undefined Field Returned from API',
			country: res.json.country ?? 'Undefined Field Returned from API',
			country_name: res.json.country_name ?? 'Undefined Field Returned from API',
			country_code: res.json.country_code ?? 'Undefined Field Returned from API',
			country_code_iso3:
				res.json.country_code_iso3 ?? 'Undefined Field Returned from API',
			country_capital:
				res.json.country_capital ?? 'Undefined Field Returned from API',
			country_tld: res.json.country_tld ?? 'Undefined Field Returned from API',
			continent_code:
				res.json.continent_code ?? 'Undefined Field Returned from API',
			in_eu: res.json.in_eu ?? false,
			postal: res.json.postal ?? 'Undefined Field Returned from API',
			latitude: res.json.latitude ?? -1,
			longitude: res.json.longitude ?? -1,
			timezone: res.json.timezone ?? 'Undefined Field Returned from API',
			utc_offset: res.json.utc_offset ?? 'Undefined Field Returned from API',
			country_calling_code:
				res.json.country_calling_code ?? 'Undefined Field Returned from API',
			currency: res.json.currency ?? 'Undefined Field Returned from API',
			currency_name: res.json.currency_name ?? 'Undefined Field Returned from API',
			languages: res.json.languages ?? 'Undefined Field Returned from API',
			country_area: res.json.country_area ?? -1,
			country_population: res.json.country_population ?? -1,
			asn: res.json.asn ?? 'Undefined Field Returned from API',
			org: res.json.org ?? 'Undefined Field Returned from API'
		};
		return result;
	});
};
