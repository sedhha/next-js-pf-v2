import { NextResponse } from 'next/server';
import { queryAllCategories } from '@/backend/contentful';
export async function GET() {
	const categories = await queryAllCategories();
	const results = categories.data.output.items.map((item) => item.slug);
	return NextResponse.json(results);
}
