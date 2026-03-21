import { NextRequest, NextResponse } from 'next/server';
import { parse as parseDotEnv } from 'dotenv';
import admin from '@/backend/supabase/client';

const CACHE_TABLE = 'cache';
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const RESERVED_CACHE_KEYS = new Set([ACCESS_TOKEN_KEY]);
const ENV_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
type CacheContent = Record<string, string>;
type CacheFormat = 'base64-json' | 'base64-dotenv' | 'raw-json' | 'raw-dotenv';

interface ParsedCacheValue {
	content: CacheContent;
	format: CacheFormat;
}

class CacheRouteError extends Error {
	status: number;

	constructor(message: string, status = 400) {
		super(message);
		this.name = 'CacheRouteError';
		this.status = status;
	}
}

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

function normalizeCacheKey(rawKey: string | null | undefined): string {
	const key = rawKey?.trim();

	if (!key) {
		throw new CacheRouteError(
			'Missing required key. Provide it in the query string or request body.',
			400
		);
	}

	if (RESERVED_CACHE_KEYS.has(key)) {
		throw new CacheRouteError(
			`Cache key "${key}" is protected and cannot be updated through this route.`,
			403
		);
	}

	return key;
}

function getDefaultCacheFormat(cacheKey: string): CacheFormat {
	return cacheKey === 'ENV_OVERRIDE' || cacheKey.endsWith('_ENV_OVERRIDE')
		? 'base64-json'
		: 'base64-dotenv';
}

function toDotEnvString(content: CacheContent): string {
	return Object.entries(content)
		.map(([key, value]) => `${key}=${JSON.stringify(value)}`)
		.join('\n');
}

function tryDecodeBase64(value: string): string | null {
	const normalized = value.trim();

	if (!normalized || !BASE64_PATTERN.test(normalized)) {
		return null;
	}

	return Buffer.from(normalized, 'base64').toString('utf-8');
}

function normalizeStoredJsonContent(
	cacheKey: string,
	sourceLabel: string,
	value: unknown
): CacheContent {
	if (!isPlainObject(value)) {
		throw new CacheRouteError(
			`Cache entry "${cacheKey}" contains ${sourceLabel}, but it is not a JSON object. Refusing to overwrite it.`,
			409
		);
	}

	const normalized: CacheContent = {};

	for (const [envKey, envValue] of Object.entries(value)) {
		if (!ENV_KEY_PATTERN.test(envKey)) {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" contains invalid variable name "${envKey}" in ${sourceLabel}. Refusing to overwrite it.`,
				409
			);
		}

		if (typeof envValue !== 'string') {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" contains non-string value for "${envKey}" in ${sourceLabel}. Refusing to overwrite it.`,
				409
			);
		}

		if (envValue.includes('\0')) {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" contains a null byte in "${envKey}". Refusing to overwrite it.`,
				409
			);
		}

		normalized[envKey] = envValue;
	}

	return normalized;
}

function assertMergeSafeEnvContent(
	cacheKey: string,
	decodedValue: string,
	content: CacheContent,
	sourceLabel: string
): void {
	const lines = decodedValue.replace(/^\uFEFF/, '').split(/\r?\n/);

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}

		const withoutExport = trimmed.startsWith('export ')
			? trimmed.slice('export '.length).trimStart()
			: trimmed;
		const separatorIndex = withoutExport.indexOf('=');

		if (separatorIndex <= 0) {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" contains unsupported ${sourceLabel} content. Refusing to overwrite it.`,
				409
			);
		}

		const envKey = withoutExport.slice(0, separatorIndex).trim();

		if (!ENV_KEY_PATTERN.test(envKey)) {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" contains invalid variable name "${envKey}" in ${sourceLabel}. Refusing to overwrite it.`,
				409
			);
		}
	}

	for (const [envKey, envValue] of Object.entries(content)) {
		if (!ENV_KEY_PATTERN.test(envKey) || typeof envValue !== 'string') {
			throw new CacheRouteError(
				`Cache entry "${cacheKey}" could not be safely parsed from ${sourceLabel}. Refusing to overwrite it.`,
				409
			);
		}
	}
}

function tryParseJsonContent(
	value: string,
	cacheKey: string,
	sourceLabel: string
): CacheContent | null {
	try {
		const parsedValue = JSON.parse(value);
		return normalizeStoredJsonContent(cacheKey, sourceLabel, parsedValue);
	} catch (error) {
		if (error instanceof CacheRouteError) {
			throw error;
		}

		return null;
	}
}

function tryParseDotEnvContent(
	value: string,
	cacheKey: string,
	sourceLabel: string
): CacheContent | null {
	try {
		const parsedValue = parseDotEnv(value);
		assertMergeSafeEnvContent(cacheKey, value, parsedValue, sourceLabel);
		return parsedValue;
	} catch (error) {
		if (error instanceof CacheRouteError) {
			throw error;
		}

		return null;
	}
}

function parseStoredCacheValue(
	storedValue: string,
	cacheKey: string
): ParsedCacheValue {
	const decodedValue = tryDecodeBase64(storedValue);

	if (decodedValue !== null) {
		const parsedBase64Json = tryParseJsonContent(
			decodedValue,
			cacheKey,
			'base64-encoded JSON'
		);

		if (parsedBase64Json) {
			return {
				content: parsedBase64Json,
				format: 'base64-json'
			};
		}

		const parsedBase64DotEnv = tryParseDotEnvContent(
			decodedValue,
			cacheKey,
			'base64-encoded .env'
		);

		if (parsedBase64DotEnv) {
			return {
				content: parsedBase64DotEnv,
				format: 'base64-dotenv'
			};
		}
	}

	const parsedRawJson = tryParseJsonContent(storedValue, cacheKey, 'raw JSON');

	if (parsedRawJson) {
		return {
			content: parsedRawJson,
			format: 'raw-json'
		};
	}

	const parsedRawDotEnv = tryParseDotEnvContent(storedValue, cacheKey, 'raw .env');

	if (parsedRawDotEnv) {
		return {
			content: parsedRawDotEnv,
			format: 'raw-dotenv'
		};
	}

	throw new CacheRouteError(
		`Cache entry "${cacheKey}" is not in a supported JSON or .env format. Refusing to overwrite it.`,
		409
	);
}

function serializeCacheValue(content: CacheContent, format: CacheFormat): string {
	const envString = toDotEnvString(content);
	const jsonString = JSON.stringify(content);

	switch (format) {
		case 'base64-json':
			return Buffer.from(jsonString).toString('base64');
		case 'base64-dotenv':
			return Buffer.from(envString).toString('base64');
		case 'raw-json':
			return jsonString;
		case 'raw-dotenv':
			return envString;
	}
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeIncomingContent(content: Record<string, unknown>): CacheContent {
	const normalized: CacheContent = {};

	for (const [key, value] of Object.entries(content)) {
		if (!ENV_KEY_PATTERN.test(key)) {
			throw new CacheRouteError(
				`Invalid key "${key}". Keys must match ${ENV_KEY_PATTERN.toString()}.`,
				400
			);
		}

		if (typeof value !== 'string') {
			throw new CacheRouteError(
				`Invalid value for key "${key}". All values must be strings.`
			);
		}

		if (value.includes('\0')) {
			throw new CacheRouteError(
				`Invalid value for key "${key}". Null bytes are not allowed.`,
				400
			);
		}

		normalized[key] = value;
	}

	if (Object.keys(normalized).length === 0) {
		throw new CacheRouteError(
			'Content must include at least one key to update.',
			400
		);
	}

	return normalized;
}

function isSameCacheContent(
	left: CacheContent,
	right: CacheContent
): boolean {
	const leftKeys = Object.keys(left).sort();
	const rightKeys = Object.keys(right).sort();

	if (leftKeys.length !== rightKeys.length) {
		return false;
	}

	return leftKeys.every(
		(key, index) => key === rightKeys[index] && left[key] === right[key]
	);
}

/**
 * GET /apis/v2/cache?key=<key>
 * Reads a row from the cache table by key, parses supported JSON/.env formats,
 * and returns the result as a flat JSON key-value object.
 * Requires a valid X-Api-Key header matching the ACCESS_TOKEN stored in the cache table.
 */
export async function GET(req: NextRequest) {
	const apiKey = req.headers.get('x-api-key');

	if (!apiKey || !(await verifyApiKey(apiKey))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);

	try {
		const key = searchParams.get('key')?.trim();

		if (!key) {
			return NextResponse.json(
				{ error: 'Missing required query parameter: key' },
				{ status: 400 }
			);
		}

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

		const parsed = parseStoredCacheValue(data.value, key).content;

		return NextResponse.json(parsed, { status: 200 });
	} catch (error: any) {
		console.error('[Cache API] GET error:', error);

		if (error instanceof CacheRouteError) {
			return NextResponse.json(
				{ error: error.message },
				{ status: error.status }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to read cache', message: error?.message },
			{ status: 500 }
		);
	}
}

/**
 * POST /apis/v2/cache?key=<key>
 * Merges incoming key-value pairs into the existing parsed cache content
 * and writes the merged result back using the existing row's storage format.
 * Requires a valid X-Api-Key header matching the ACCESS_TOKEN stored in the cache table.
 */
export async function POST(req: NextRequest) {
	const apiKey = req.headers.get('x-api-key');

	if (!apiKey || !(await verifyApiKey(apiKey))) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let body: {
		key?: string;
		content?: unknown;
		data?: unknown;
		value?: unknown;
	};

	try {
		const parsedBody = await req.json();

		if (!isPlainObject(parsedBody)) {
			return NextResponse.json(
				{ error: 'Invalid JSON body. Expected an object.' },
				{ status: 400 }
			);
		}

		body = parsedBody;
	} catch {
		return NextResponse.json(
			{ error: 'Invalid JSON body' },
			{ status: 400 }
		);
	}

	const { searchParams } = new URL(req.url);
	const incomingContent = body.content ?? body.data ?? body.value;

	if (!isPlainObject(incomingContent)) {
		return NextResponse.json(
			{
				error:
					'Invalid content format. Expected an object with string key-value pairs.'
			},
			{ status: 400 }
		);
	}

	try {
		const key = normalizeCacheKey(searchParams.get('key') ?? body.key);
		const normalizedIncomingContent = normalizeIncomingContent(incomingContent);
		const { data, error } = await admin
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', key)
			.single();

		if (error && error.code !== 'PGRST116') {
			throw error;
		}

		const parsedExistingValue = data?.value
			? parseStoredCacheValue(data.value, key)
			: null;
		const existingContent = parsedExistingValue?.content ?? {};
		const mergedContent = {
			...existingContent,
			...normalizedIncomingContent
		};
		const storageFormat =
			parsedExistingValue?.format ?? getDefaultCacheFormat(key);
		const encodedValue = serializeCacheValue(mergedContent, storageFormat);

		if (data?.value && isSameCacheContent(existingContent, mergedContent)) {
			return NextResponse.json(
				{
					success: true,
					key,
					count: Object.keys(mergedContent).length,
					updatedKeys: [],
					unchanged: true
				},
				{ status: 200 }
			);
		}

		const verifiedMergedContent = parseStoredCacheValue(
			encodedValue,
			key
		).content;

		if (!isSameCacheContent(mergedContent, verifiedMergedContent)) {
			throw new CacheRouteError(
				'Internal validation failed while preparing the cache update. Existing entry was left unchanged.',
				500
			);
		}

		if (data?.value) {
			const { data: updatedRow, error: updateError } = await admin
				.from(CACHE_TABLE)
				.update({
					value: encodedValue
				})
				.eq('key', key)
				.eq('value', data.value)
				.select('key')
				.maybeSingle();

			if (updateError) {
				throw updateError;
			}

			if (!updatedRow) {
				throw new CacheRouteError(
					`Cache entry "${key}" changed while updating. Existing entry was left unchanged; please retry.`,
					409
				);
			}
		} else {
			const { error: insertError } = await admin.from(CACHE_TABLE).insert({
				key,
				value: encodedValue
			});

			if (insertError) {
				if (insertError.code === '23505') {
					throw new CacheRouteError(
						`Cache entry "${key}" was created by another request. Existing entry was left unchanged; please retry.`,
						409
					);
				}

				throw insertError;
			}
		}

		return NextResponse.json(
			{
				success: true,
				key,
				count: Object.keys(mergedContent).length,
				updatedKeys: Object.keys(normalizedIncomingContent)
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error('[Cache API] POST error:', error);

		if (error instanceof CacheRouteError) {
			return NextResponse.json(
				{ error: error.message },
				{ status: error.status }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to update cache', message: error?.message },
			{ status: 500 }
		);
	}
}
