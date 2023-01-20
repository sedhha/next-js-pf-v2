interface IGeoAPI {
	ip: string;
	network: string;
	version: string;
	city: string;
	region: string;
	region_code: string;
	country: string;
	country_name: string;
	country_code: string;
	country_code_iso3: string;
	country_capital: string;
	country_tld: string;
	continent_code: string;
	in_eu: boolean;
	postal: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utc_offset: string;
	country_calling_code: string;
	currency: string;
	currency_name: string;
	languages: string;
	country_area: number;
	country_population: number;
	asn: string;
	org: string;
}

interface ISessionData {
	connectedAt: number; // timestamp
	disconnectedAt: number; // timestamp
	duration: number;
	disconnectedForcefully: boolean;
}

interface IEventData {
	actionID: string;
	eventCount: number;
	eventTriggeredTimes: number[];
}

type IAnalyticsData = {
	docPath: string;
	sessionID: string;
	ua: string;
	events: IEventData[]; // To be stored in a seperate collection

	// Viewed Sections
	workViewed: boolean;
	blogViewed: boolean;
	contactViewed: boolean;
	projectsViewed: boolean;
	awardsViewed: boolean;
	videosViewed: boolean;
	testimonialsViewed: boolean;
	techStackViewed: boolean;
} & IGeoAPI &
	ISessionData;

type IFEData = { events: IEventData[] } & IGeoAPI;

interface ITransformData {
	data: IFEData;
	docPath: string;
	csrf: string;
	ua: string;
	sessionData: ISessionData;
}

export type {
	IAnalyticsData,
	IEventData,
	ISessionData,
	IGeoAPI,
	IFEData,
	ITransformData
};
