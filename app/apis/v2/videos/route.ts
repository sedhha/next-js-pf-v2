// app/api/videos/route.ts
import { NextResponse } from 'next/server';
import { listVideos } from '@/components/v4/AllVideos/videos';

export const dynamic = 'force-dynamic'; // no static caching

export async function GET(req: Request) {
	const url = new URL(req.url);
	const limit = Number(url.searchParams.get('limit') ?? 6);
	const skip = Number(url.searchParams.get('skip') ?? 0);

	try {
		const data = listVideos({ limit, skip });
		return NextResponse.json(data, {
			headers: { 'Cache-Control': 'private, no-store' }
		});
	} catch (err) {
		console.error('[Videos API] error', err);
		return NextResponse.json({ error: 'Failed to load videos' }, { status: 500 });
	}
}
