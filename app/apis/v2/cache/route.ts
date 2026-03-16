import { NextRequest, NextResponse } from 'next/server';
import { parse as parseDotEnv } from 'dotenv';
import admin from '@/backend/supabase/client';

const CACHE_TABLE = 'cache';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

async function verifyApiKey(apiKey: string): Promise<boolean> {
	const { data, error } = await admin
		.from(CACHE_TABLE)
		.select('value')
		.eq('key', ACCESS_TOKEN_KEY)
		.single();

	if (error || !data?.value) return false;

	const decoded = Buffer.from(data.value, 'base64').toString('utf-8');
	return apiKey === decoded;
}

/**
 * GET /apis/v2/cache?key=<key>
 * Reads a row from the cache table by key, base64-decodes it, parses it as
 * .env format, and returns the result as a flat JSON key-value object.
 * Comments and blank lines are stripped server-side — clients receive clean data.
 * Requires a valid X-Api-Key header matching the ACCESS_TOKEN stored in the cache table.
 */
export async function GET(req: NextRequest) {
	const apiKey = req.headers.get('x-api-key');

	if (!apiKey || !(await verifyApiKey(apiKey))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const key = searchParams.get('key');

	if (!key) {
		return NextResponse.json(
			{ error: 'Missing required query parameter: key' },
			{ status: 400 }
		);
	}

	try {
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', key)
			.single();

		if (error) {
			if (error.code === 'PGRST116') {
				return NextResponse.json(
					{ error: `No cache entry found for key: ${key}` },
					{ status: 404 }
				);
			}
			throw error;
		}

		if (!data?.value) {
			return NextResponse.json(
				{ error: `Cache entry for key "${key}" has no value` },
				{ status: 404 }
			);
		}

		const decoded = Buffer.from(data.value, 'base64').toString('utf-8');
		const parsed = parseDotEnv(decoded);

		return NextResponse.json(parsed, { status: 200 });
	} catch (error: any) {
		console.error('[Cache API] GET error:', error);
		return NextResponse.json(
			{ error: 'Failed to read cache', message: error?.message },
			{ status: 500 }
		);
	}
}
