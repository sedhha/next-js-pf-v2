export const getUAIdentifier = (ua?: string, xch?: string) =>
	`${ua}::${xch ?? 'mobile'}`;
