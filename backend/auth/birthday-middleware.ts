/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Types
export interface JWTPayload {
	token_id: string;
	iat: number;
	exp: number;
}

export interface AuthContext {
	payload: JWTPayload;
	token: string;
	remainingTime: number;
	expiresAt: Date;
}

/**
 * Extract Bearer token from Authorization header
 * Format: "Authorization: Bearer <token>"
 */
function extractBearerToken(authHeader: string | null): string | null {
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}

	return authHeader.slice(7);
}

/**
 * Verify JWT token signature and expiration
 */
function verifyJWT(token: string): {
	valid: boolean;
	payload?: JWTPayload;
	error?: string;
} {
	try {
		const secret = process.env.PERSONAL_ACCESS_TOKEN;

		if (!secret) {
			return {
				valid: false,
				error: 'JWT_SECRET is not configured'
			};
		}

		const payload = jwt.verify(token, secret) as JWTPayload;

		return {
			valid: true,
			payload
		};
	} catch (error) {
		let errorMessage = 'Token verification failed';

		if (error instanceof jwt.TokenExpiredError) {
			errorMessage = `Token expired at ${error.expiredAt.toISOString()}`;
		} else if (error instanceof jwt.JsonWebTokenError) {
			errorMessage = error.message;
		}

		return {
			valid: false,
			error: errorMessage
		};
	}
}

/**
 * Calculate remaining time until token expiration (in seconds)
 */
function getTimeRemaining(payload: JWTPayload): number {
	const remaining = payload.exp - Math.floor(Date.now() / 1000);
	return remaining > 0 ? remaining : 0;
}

/**
 * Base middleware to verify Bearer token and inject auth headers
 * This middleware can be wrapped by other middlewares
 */
export function withAuth(
	handler: (req: NextRequest, auth: AuthContext) => Promise<NextResponse>
) {
	return async (req: NextRequest): Promise<NextResponse> => {
		try {
			const authHeader = req.headers.get('Authorization');
			const token = extractBearerToken(authHeader);

			if (!token) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: 'Missing Bearer token'
					},
					{ status: 401 }
				);
			}

			const verification = verifyJWT(token);

			if (!verification.valid) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: verification.error
					},
					{ status: 401 }
				);
			}

			const remainingTime = getTimeRemaining(verification.payload!);
			const expiresAt = new Date(verification.payload!.exp * 1000);

			const auth: AuthContext = {
				payload: verification.payload!,
				token,
				remainingTime,
				expiresAt
			};

			// Call the wrapped handler with auth context
			return await handler(req, auth);
		} catch (error) {
			console.error('[Auth Middleware Error]:', error);

			return NextResponse.json(
				{
					error: 'Internal Server Error',
					message: error instanceof Error ? error.message : 'Authentication failed'
				},
				{ status: 500 }
			);
		}
	};
}

/**
 * Enhanced middleware that also injects auth into request headers
 * Allows handlers to read auth info from custom headers
 *
 * Injected headers:
 * - X-User-ID: The client/user ID (token_id)
 * - X-Token-Expires-At: ISO timestamp when token expires
 * - X-Token-Expires-In: Seconds until expiry
 * - X-Token-IAT: Token issued at (unix timestamp)
 * - X-Token-EXP: Token expiration (unix timestamp)
 */
export function withAuthHeaders(
	handler: (
		req: NextRequest & { auth: AuthContext },
		auth: AuthContext
	) => Promise<NextResponse>
) {
	return async (req: NextRequest): Promise<NextResponse> => {
		try {
			const authHeader = req.headers.get('Authorization');
			const token = extractBearerToken(authHeader);

			if (!token) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: 'Missing Bearer token'
					},
					{ status: 401 }
				);
			}

			const verification = verifyJWT(token);

			if (!verification.valid) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: verification.error
					},
					{ status: 401 }
				);
			}

			const remainingTime = getTimeRemaining(verification.payload!);
			const expiresAt = new Date(verification.payload!.exp * 1000);

			const auth: AuthContext = {
				payload: verification.payload!,
				token,
				remainingTime,
				expiresAt
			};

			// Create a custom request object with auth attached
			const reqWithAuth = req as NextRequest & { auth: AuthContext };
			reqWithAuth.auth = auth;

			// Alternatively, create new headers
			const newHeaders = new Headers(req.headers);
			newHeaders.set('X-User-ID', auth.payload.token_id);
			newHeaders.set('X-Token-Expires-At', auth.expiresAt.toISOString());
			newHeaders.set('X-Token-Expires-In', auth.remainingTime.toString());
			newHeaders.set('X-Token-IAT', auth.payload.iat.toString());
			newHeaders.set('X-Token-EXP', auth.payload.exp.toString());

			// Call the wrapped handler
			return await handler(reqWithAuth, auth);
		} catch (error) {
			console.error('[Auth Middleware Error]:', error);

			return NextResponse.json(
				{
					error: 'Internal Server Error',
					message: error instanceof Error ? error.message : 'Authentication failed'
				},
				{ status: 500 }
			);
		}
	};
}

/**
 * Helper function to extract auth info from request headers
 * Use this in your handler if you need to access auth without AuthContext
 */
export function extractAuthFromHeaders(req: NextRequest) {
	return {
		userId: req.headers.get('X-User-ID'),
		expiresAt: req.headers.get('X-Token-Expires-At'),
		expiresIn: req.headers.get('X-Token-Expires-In'),
		iat: req.headers.get('X-Token-IAT'),
		exp: req.headers.get('X-Token-EXP')
	};
}

/**
 * Middleware with specific token_id check and headers injection
 */
export function withAuthIdHeaders(
	expectedTokenId: string,
	handler: (
		req: NextRequest & { auth: AuthContext },
		auth: AuthContext
	) => Promise<NextResponse>
) {
	return async (req: NextRequest): Promise<NextResponse> => {
		try {
			const authHeader = req.headers.get('Authorization');
			const token = extractBearerToken(authHeader);

			if (!token) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: 'Missing Bearer token'
					},
					{ status: 401 }
				);
			}

			const verification = verifyJWT(token);

			if (!verification.valid) {
				return NextResponse.json(
					{
						error: 'Unauthorized',
						message: verification.error
					},
					{ status: 401 }
				);
			}

			if (verification.payload?.token_id !== expectedTokenId) {
				return NextResponse.json(
					{
						error: 'Forbidden',
						message: `Access denied. Expected token_id: ${expectedTokenId}`
					},
					{ status: 403 }
				);
			}

			const remainingTime = getTimeRemaining(verification.payload!);
			const expiresAt = new Date(verification.payload!.exp * 1000);

			const auth: AuthContext = {
				payload: verification.payload!,
				token,
				remainingTime,
				expiresAt
			};

			const reqWithAuth = req as NextRequest & { auth: AuthContext };
			reqWithAuth.auth = auth;

			const newHeaders = new Headers(req.headers);
			newHeaders.set('X-User-ID', auth.payload.token_id);
			newHeaders.set('X-Token-Expires-At', auth.expiresAt.toISOString());
			newHeaders.set('X-Token-Expires-In', auth.remainingTime.toString());

			return await handler(reqWithAuth, auth);
		} catch (error) {
			console.error('[Auth Middleware Error]:', error);

			return NextResponse.json(
				{
					error: 'Internal Server Error',
					message: error instanceof Error ? error.message : 'Authentication failed'
				},
				{ status: 500 }
			);
		}
	};
}
