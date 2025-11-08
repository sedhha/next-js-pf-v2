import { NextRequest, NextResponse } from 'next/server';
import {
	getEnvOverrides,
	saveEnvOverrides,
	deleteEnvOverrides,
	loadEnvOverrides
} from '@/backend/supabase/env-cache';
import admin from '@/backend/supabase/client';

const CACHE_TABLE = 'cache';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

/**
 * Validates password against ACCESS_TOKEN from cache table
 * Fetches base64 encoded token and compares with provided password
 */
async function verifyPassword(password: string): Promise<boolean> {
	try {
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', ACCESS_TOKEN_KEY)
			.single();

		if (error || !data?.value) {
			console.error('[Auth] Failed to fetch ACCESS_TOKEN:', error);
			return false;
		}

		// Base64 decode the stored token
		const decodedToken = Buffer.from(data.value, 'base64').toString('utf-8');

		// Compare with provided password
		return password === decodedToken;
	} catch (error) {
		console.error('[Auth] Error validating password:', error);
		return false;
	}
}

/**
 * GET /apis/v2/personal/credentials
 * Retrieves current environment overrides
 */
export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const password = searchParams.get('password');

		if (!password || !(await verifyPassword(password))) {
			return NextResponse.json(
				{ error: 'Unauthorized: Invalid password' },
				{ status: 401 }
			);
		}

		const envVars = await getEnvOverrides();

		return NextResponse.json(
			{
				success: true,
				data: envVars || {},
				count: Object.keys(envVars || {}).length
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('[Credentials API] GET error:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve credentials', message: error?.message },
			{ status: 500 }
		);
	}
}

/**
 * POST /apis/v2/personal/credentials
 * Updates environment overrides
 */
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { password, credentials } = body;

		if (!password || !(await verifyPassword(password))) {
			return NextResponse.json(
				{ error: 'Unauthorized: Invalid password' },
				{ status: 401 }
			);
		}

		if (!credentials || typeof credentials !== 'object') {
			return NextResponse.json(
				{
					error: 'Invalid credentials format. Expected object with key-value pairs.'
				},
				{ status: 400 }
			);
		}

		// Validate all values are strings
		for (const [key, value] of Object.entries(credentials)) {
			if (typeof value !== 'string') {
				return NextResponse.json(
					{ error: `Invalid value for key "${key}". All values must be strings.` },
					{ status: 400 }
				);
			}
		}

		await saveEnvOverrides(credentials);

		// Reload to apply changes to process.env immediately
		await loadEnvOverrides(true);

		return NextResponse.json(
			{
				success: true,
				message: 'Credentials updated successfully',
				count: Object.keys(credentials).length
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('[Credentials API] POST error:', error);
		return NextResponse.json(
			{ error: 'Failed to update credentials', message: error?.message },
			{ status: 500 }
		);
	}
}

/**
 * DELETE /apis/v2/personal/credentials
 * Deletes all environment overrides
 */
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const password = searchParams.get('password');

		if (!password || !(await verifyPassword(password))) {
			return NextResponse.json(
				{ error: 'Unauthorized: Invalid password' },
				{ status: 401 }
			);
		}

		await deleteEnvOverrides();

		return NextResponse.json(
			{
				success: true,
				message: 'All credentials deleted successfully'
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('[Credentials API] DELETE error:', error);
		return NextResponse.json(
			{ error: 'Failed to delete credentials', message: error?.message },
			{ status: 500 }
		);
	}
}
