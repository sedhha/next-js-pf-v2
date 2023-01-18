import { z } from 'zod';

const geoSchema = z.object({
	ip: z.string(),
	network: z.string(),
	version: z.string(),
	city: z.string(),
	region: z.string(),
	region_code: z.string(),
	country: z.string(),
	country_name: z.string(),
	country_code: z.string(),
	country_code_iso3: z.string(),
	country_capital: z.string(),
	country_tld: z.string(),
	continent_code: z.string(),
	in_eu: z.boolean(),
	postal: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	timezone: z.string(),
	utc_offset: z.string(),
	country_calling_code: z.string(),
	currency: z.string(),
	currency_name: z.string(),
	languages: z.string(),
	country_area: z.number(),
	country_population: z.number(),
	asn: z.string(),
	org: z.string()
});

// const sessionDataSchema = z.object({
// 	connectedAt: z.number(),
// 	disconnectedAt: z.number(),
// 	duration: z.number(),
// 	disconnectedForcefully: z.boolean()
// });

const eventDataSchema = z.object({
	actionID: z.string(),
	eventCount: z.number(),
	eventTriggeredTimes: z.array(z.number())
});

const analyticsDataSchema = z
	.object({
		events: z.array(eventDataSchema).nullable()
	})
	.and(geoSchema);

export { analyticsDataSchema };
