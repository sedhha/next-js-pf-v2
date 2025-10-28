import admin from '@/backend/supabase/client';

const TABLE = 'birthday-configurations';

/**
 * Interface for birthday configuration
 */
export interface BirthdayConfiguration {
	id: string;
	user_id: string;
	configuration: Record<string, unknown>; // JSON column
	system_prompt: string;
	qdrant_colection_name: string;
	initial_message: string;
	s3_folder: string;
	created_at: string;
	image_captions: string[];
}

/**
 * Pull configuration for a specific user
 * @param userId - The user ID (from token_id)
 * @returns Configuration object or null if not found
 */
export async function pullConfigByUserId(
	userId: string
): Promise<BirthdayConfiguration | null> {
	try {
		const { data, error } = await admin
			.from(TABLE)
			.select('*')
			.eq('user_id', userId)
			.single();

		if (error) {
			// If no rows found, it's not an error, just return null
			if (error.code === 'PGRST116') {
				return null;
			}
			throw error;
		}

		return data as BirthdayConfiguration;
	} catch (error) {
		console.error('[Supabase Error] Failed to pull config:', error);
		throw error;
	}
}

/**
 * Get just the config JSON (without metadata)
 * @param userId - The user ID
 * @returns Config object or null
 */
export async function getConfigJson(
	userId: string
): Promise<Record<string, unknown> | null> {
	try {
		const config = await pullConfigByUserId(userId);
		return config?.configuration || null;
	} catch (error) {
		console.error('[Supabase Error] Failed to get config json:', error);
		throw error;
	}
}

/**
 * Create a new configuration for a user
 * @param userId - The user ID
 * @param config - The configuration object
 * @returns Created configuration
 */
export async function createConfig(
	userId: string,
	config: Record<string, unknown>
): Promise<BirthdayConfiguration> {
	try {
		const { data, error } = await admin
			.from(TABLE)
			.insert({
				user_id: userId,
				config: config
			})
			.select()
			.single();

		if (error) throw error;

		return data as BirthdayConfiguration;
	} catch (error) {
		console.error('[Supabase Error] Failed to create config:', error);
		throw error;
	}
}

/**
 * Update configuration for a user
 * @param userId - The user ID
 * @param config - The updated configuration object
 * @returns Updated configuration
 */
export async function updateConfig(
	userId: string,
	config: Record<string, unknown>
): Promise<BirthdayConfiguration> {
	try {
		const { data, error } = await admin
			.from(TABLE)
			.update({
				config: config,
				updated_at: new Date().toISOString()
			})
			.eq('user_id', userId)
			.select()
			.single();

		if (error) throw error;

		return data as BirthdayConfiguration;
	} catch (error) {
		console.error('[Supabase Error] Failed to update config:', error);
		throw error;
	}
}

/**
 * Delete configuration for a user
 * @param userId - The user ID
 * @returns Success status
 */
export async function deleteConfig(userId: string): Promise<boolean> {
	try {
		const { error } = await admin.from(TABLE).delete().eq('user_id', userId);

		if (error) throw error;

		return true;
	} catch (error) {
		console.error('[Supabase Error] Failed to delete config:', error);
		throw error;
	}
}

/**
 * Upsert configuration (create if not exists, update if exists)
 * @param userId - The user ID
 * @param config - The configuration object
 * @returns Upserted configuration
 */
export async function upsertConfig(
	userId: string,
	config: Record<string, unknown>
): Promise<BirthdayConfiguration> {
	try {
		const existing = await pullConfigByUserId(userId);

		if (existing) {
			return await updateConfig(userId, config);
		} else {
			return await createConfig(userId, config);
		}
	} catch (error) {
		console.error('[Supabase Error] Failed to upsert config:', error);
		throw error;
	}
}
