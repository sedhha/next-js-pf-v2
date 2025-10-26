import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Types
interface JWTPayload {
	token_id: string;
	iat: number;
	exp: number;
}

interface RequestBody {
	clientId: string;
	clientSecret: string;
	clientName: string;
	expirationAge: number; // in seconds
}

// Validate request body
function validateRequestBody(body: unknown): body is RequestBody {
	if (typeof body !== 'object' || body === null) {
		return false;
	}

	const obj = body as Record<string, unknown>;
	return (
		typeof obj.clientName === 'string' &&
		typeof obj.expirationAge === 'number' &&
		obj.expirationAge > 0
	);
}

// Extract and validate Basic Auth
function extractBasicAuth(authHeader: string | null): {
	username: string;
	password: string;
} | null {
	if (!authHeader || !authHeader.startsWith('Basic ')) {
		return null;
	}

	try {
		const credentials = Buffer.from(authHeader.slice(6), 'base64').toString(
			'utf-8'
		);
		const [username, password] = credentials.split(':');

		if (!username || !password) {
			return null;
		}

		return { username, password };
	} catch {
		return null;
	}
}

// Verify credentials
function verifyCredentials(
	basicAuthUsername: string,
	basicAuthPassword: string
): boolean {
	const expectedClientId = process.env.LOCAL_CLIENT_ID;
	const expectedClientSecret = process.env.LOCAL_CLIENT_SECRET;

	// Verify Basic Auth credentials
	if (
		basicAuthUsername !== expectedClientId ||
		basicAuthPassword !== expectedClientSecret
	) {
		return false;
	}

	return true;
}

// Generate JWT
function generateJWT(clientName: string, expirationAge: number): string {
	const jwtSecret = process.env.PERSONAL_ACCESS_TOKEN;

	if (!jwtSecret) {
		throw new Error('JWT_SECRET is not configured');
	}

	const now = Math.floor(Date.now() / 1000);
	const exp = now + expirationAge;

	const payload: JWTPayload = {
		token_id: clientName,
		iat: now,
		exp
	};

	return jwt.sign(payload, jwtSecret);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		// Check for Basic Auth header
		const authHeader = request.headers.get('authorization');
		const basicAuth = extractBasicAuth(authHeader);

		if (!basicAuth) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
					message: 'Missing or invalid Basic Authentication header'
				},
				{
					status: 401,
					headers: { 'WWW-Authenticate': 'Basic realm="JWT Generation API"' }
				}
			);
		}

		// Parse request body
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return NextResponse.json(
				{
					error: 'Bad Request',
					message: 'Invalid JSON in request body'
				},
				{ status: 400 }
			);
		}

		// Validate request body structure
		if (!validateRequestBody(body)) {
			return NextResponse.json(
				{
					error: 'Bad Request',
					message:
						'Missing or invalid fields. Required: clientName, expirationAge (number > 0)'
				},
				{ status: 400 }
			);
		}

		const { clientName, expirationAge } = body;

		// Validate credentials
		if (!verifyCredentials(basicAuth.username, basicAuth.password)) {
			return NextResponse.json(
				{
					error: 'Unauthorized',
					message: 'Invalid credentials'
				},
				{ status: 401 }
			);
		}

		// Validate client name
		if (clientName.trim().length === 0) {
			return NextResponse.json(
				{
					error: 'Bad Request',
					message: 'clientName cannot be empty'
				},
				{ status: 400 }
			);
		}

		// Validate expiration age
		if (expirationAge < 1 || expirationAge > 31536000) {
			// Max 1 year in seconds
			return NextResponse.json(
				{
					error: 'Bad Request',
					message: 'expirationAge must be between 1 and 31536000 seconds (1 year)'
				},
				{ status: 400 }
			);
		}

		// Generate JWT
		const token = generateJWT(clientName, expirationAge);

		return NextResponse.json(
			{
				success: true,
				token,
				tokenInfo: {
					token_id: clientName,
					expiresIn: expirationAge,
					expiresAt: new Date(Date.now() + expirationAge * 1000).toISOString()
				}
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('JWT Generation Error:', error);

		return NextResponse.json(
			{
				error: 'Internal Server Error',
				message:
					error instanceof Error ? error.message : 'An unexpected error occurred'
			},
			{ status: 500 }
		);
	}
}
