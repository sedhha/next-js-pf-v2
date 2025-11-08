#!/usr/bin/env node
/**
 * Syncs environment variables from Supabase cache to .env.local
 * Runs automatically before dev/build via npm pre-scripts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const CACHE_TABLE = 'cache';
const ENV_OVERRIDE_KEY = 'ENV_OVERRIDE';

// Minimum required env vars for this script to work
const REQUIRED_VARS = ['SUPABASE_PROJECT_ID', 'SUPABASE_SERVICE_ROLE'];

async function syncEnvFromSupabase() {
	console.log('🔄 [Sync] Starting environment sync from Supabase...');

	// Check for required variables
	const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
	if (missing.length > 0) {
		console.error(
			`❌ [Sync] Missing required environment variables: ${missing.join(', ')}`
		);
		console.error(
			'💡 [Sync] Set these in your system environment or Vercel dashboard'
		);
		console.error('   Required: SUPABASE_PROJECT_ID, SUPABASE_SERVICE_ROLE');
		process.exit(1);
	}

	const supabaseUrl = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`;
	const supabaseKey = process.env.SUPABASE_SERVICE_ROLE!;

	const supabase = createClient(supabaseUrl, supabaseKey);

	try {
		const { data, error } = await supabase
			.from(CACHE_TABLE)
			.select('value')
			.eq('key', ENV_OVERRIDE_KEY)
			.single();

		if (error) {
			console.error('❌ [Sync] Failed to fetch from Supabase:', error.message);
			process.exit(1);
		}

		if (!data?.value) {
			console.error('❌ [Sync] No ENV_OVERRIDE found in cache table');
			console.error(
				'💡 [Sync] Use /personal/credentials to add environment variables'
			);
			process.exit(1);
		}

		// Decode base64
		const decodedJson = Buffer.from(data.value, 'base64').toString('utf-8');
		const envVars = JSON.parse(decodedJson);

		// Generate .env.local content
		let envContent =
			'# 🤖 AUTO-GENERATED from Supabase cache - DO NOT EDIT MANUALLY\n';
		envContent += `# Last synced: ${new Date().toISOString()}\n`;
		envContent += '# Edit via: /personal/credentials\n\n';

		// Sort keys for better readability
		const sortedKeys = Object.keys(envVars).sort();

		for (const key of sortedKeys) {
			const value = envVars[key];
			// Handle multiline values (like private keys)
			const escapedValue = String(value)
				.replace(/\\/g, '\\\\')
				.replace(/\n/g, '\\n')
				.replace(/"/g, '\\"');
			envContent += `${key}="${escapedValue}"\n`;
		}

		// Write to .env.local
		const envPath = path.join(process.cwd(), '.env.local');
		fs.writeFileSync(envPath, envContent, 'utf-8');

		console.log('✅ [Sync] Successfully synced to .env.local');
		console.log(`📝 [Sync] Synced ${sortedKeys.length} variables`);
		console.log('🔒 [Sync] Single source of truth: Supabase cache table');
	} catch (error: any) {
		console.error(
			'❌ [Sync] Error syncing environment variables:',
			error.message
		);
		process.exit(1);
	}
}

syncEnvFromSupabase();
