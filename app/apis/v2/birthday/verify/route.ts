// app/api/protected/route.ts
import { AuthContext, withAuth } from '@/backend/auth/birthday-middleware';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, auth: AuthContext) => {
	return NextResponse.json({
		message: `Hello ${auth.payload.token_id}!`,
		remainingTime: auth.remainingTime
	});
};

export const GET = withAuth(handler);
export const POST = withAuth(handler);
