import admin from '@/backend/supabase/client';

const CACHE_TABLE = 'cache';
const ENV_OVERRIDE_KEY = 'ENV_OVERRIDE';

interface CacheRow {
	key: string;
	value: string;
	created_at?: string;
	updated_at?: string;
}

/**
 * Fetches ENV_OVERRIDE from cache table and sets environment variables
 * @returns Object containing the decoded environment variables
 */
export async function loadEnvOverrides(): Promise<Record<string, string>> {
	try {
		// Fetch the ENV_OVERRIDE row from cache table
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', ENV_OVERRIDE_KEY)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				console.log('[Env Override] No ENV_OVERRIDE found in cache');
				return {};
			}
			throw error;
		}

		if (!data?.value) {
			console.log('[Env Override] ENV_OVERRIDE exists but value is empty');
			return {};
		}

		// Decode base64 value
		const decodedJson = Buffer.from(data.value, 'base64').toString('utf-8');

		// Parse JSON
		const envVars = JSON.parse(decodedJson) as Record<string, string>;

		// Set environment variables
		Object.entries(envVars).forEach(([key, value]) => {
			process.env[key] = value;
			console.log(`[Env Override] Set ${key}`);
		});

		console.log(
			`[Env Override] Loaded ${Object.keys(envVars).length} environment variables`
		);

		return envVars;
	} catch (error) {
		console.error('[Supabase Error] Failed to load env overrides:', error);
		throw error;
	}
}

/**
 * Gets the current ENV_OVERRIDE value without setting environment variables
 * @returns The decoded environment variables object
 */
export async function getEnvOverrides(): Promise<Record<
	string,
	string
> | null> {
	try {
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', ENV_OVERRIDE_KEY)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return null;
			}
			throw error;
		}

		if (!data?.value) {
			return null;
		}

		const decodedJson = Buffer.from(data.value, 'base64').toString('utf-8');
		return JSON.parse(decodedJson) as Record<string, string>;
	} catch (error) {
		console.error('[Supabase Error] Failed to get env overrides:', error);
		throw error;
	}
}

/**
 * Saves environment variables to cache table as base64-encoded JSON
 * @param envVars - Object containing key-value pairs to store
 * @returns The created/updated cache row
 */
export async function saveEnvOverrides(
	envVars: Record<string, string>
): Promise<CacheRow> {
	try {
		// Encode to base64
		const jsonString = JSON.stringify(envVars);
		const base64Value = Buffer.from(jsonString).toString('base64');

		// Upsert into cache table
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.upsert(
				{
					key: ENV_OVERRIDE_KEY,
					value: base64Value
				},
				{
					onConflict: 'key'
				}
			)
			.select()
			.single();

		if (error) throw error;

		console.log(
			`[Env Override] Saved ${Object.keys(envVars).length} environment variables`
		);

		return data as CacheRow;
	} catch (error) {
		console.error('[Supabase Error] Failed to save env overrides:', error);
		throw error;
	}
}

/**
 * Deletes the ENV_OVERRIDE from cache table
 * @returns Success status
 */
export async function deleteEnvOverrides(): Promise<boolean> {
	try {
		const { error } = await admin
			.from(CACHE_TABLE)
			.delete()
			.eq('key', ENV_OVERRIDE_KEY);

		if (error) throw error;

		console.log('[Env Override] Deleted ENV_OVERRIDE from cache');
		return true;
	} catch (error) {
		console.error('[Supabase Error] Failed to delete env overrides:', error);
		throw error;
	}
}
