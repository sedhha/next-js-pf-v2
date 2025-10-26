import { NextRequest, NextResponse } from 'next/server';
import {
	withAuthHeaders,
	AuthContext
} from '@/backend/auth/birthday-middleware';
import { pullConfigByUserId } from '@/backend/supabase/birthday-config';

/**
 * Handler for pulling user configuration
 * Authenticated route that retrieves the birthday configuration for the authenticated user
 *
 * Returns:
 * - 200: Configuration found and returned
 * - 404: No configuration found for this user
 * - 401: Unauthorized (no valid token)
 * - 500: Server error
 */
async function pullConfigHandler(
	req: NextRequest,
	auth: AuthContext
): Promise<NextResponse> {
	try {
		// Get user ID from token_id (injected by middleware)
		const userId = auth.payload.token_id;

		console.log(`[Pull Config] Fetching config for user: ${userId}`);

		// Query configuration from Supabase
		const config = await pullConfigByUserId(userId);

		// If no configuration found
		if (!config) {
			return NextResponse.json(
				{
					error: 'Not Found',
					message: `No configuration found for user: ${userId}`
				},
				{ status: 404 }
			);
		}
		// Return the configuration as is
		return NextResponse.json(
			{
				success: true,
				data: config.configuration, // Return just the config JSON
				metadata: {
					userId: config.user_id,
					createdAt: config.created_at,
					tokenExpiresAt: auth.expiresAt.toISOString()
				}
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('[Pull Config Error]:', error);

		// Handle specific Supabase errors
		if (error instanceof Error) {
			if (error.message.includes('PGRST')) {
				return NextResponse.json(
					{
						error: 'Database Error',
						message: 'Failed to fetch configuration'
					},
					{ status: 500 }
				);
			}
		}

		return NextResponse.json(
			{
				error: 'Internal Server Error',
				message: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
}

/**
 * GET endpoint to pull configuration
 * Requires valid JWT Bearer token
 * Token_id from JWT is used as user_id to query the database
 */
export const GET = withAuthHeaders(pullConfigHandler);

/**
 * POST endpoint also supported (in case you want to use POST for config retrieval)
 */
export const POST = withAuthHeaders(pullConfigHandler);
