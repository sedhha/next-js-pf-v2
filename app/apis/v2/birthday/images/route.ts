// app/api/birthday/images/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
	S3Client,
	ListObjectsV2Command,
	GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { unstable_cache, revalidateTag } from 'next/cache';
import {
	withAuthHeaders,
	AuthContext
} from '@/backend/auth/birthday-middleware';
import { pullConfigByUserId } from '@/backend/supabase/birthday-config';

// Initialize S3 Client
const s3Client = new S3Client({
	region: process.env.NEXT_AWS_REGION || 'us-east-2',
	credentials: {
		accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY || ''
	}
});

const URL_EXPIRATION_SECONDS = 7200; // 2 hours

// Helper function to parse S3 URI and extract bucket and folder path
function parseS3Uri(s3Uri: string): { bucket: string; folderPath: string } {
	// Handle formats like:

	let uri = s3Uri.trim();
	let bucket = 'gzb-services'; // default bucket
	let folderPath = '';

	// Remove s3:// prefix if present
	if (uri.startsWith('s3://')) {
		uri = uri.substring(5);
	}

	// Split by first slash to get bucket and path
	const firstSlashIndex = uri.indexOf('/');
	if (firstSlashIndex > 0) {
		bucket = uri.substring(0, firstSlashIndex);
		folderPath = uri.substring(firstSlashIndex + 1);
	} else {
		// No slash found, assume it's just the folder path
		folderPath = uri;
	}

	// Ensure folder path ends with / for proper prefix matching
	if (folderPath && !folderPath.endsWith('/')) {
		folderPath += '/';
	}

	return { bucket, folderPath };
}

// Cache the Supabase config fetch per user
const getCachedPersonaConfig = unstable_cache(
	async (userId: string) => pullConfigByUserId(userId),
	['persona-config'],
	{ revalidate: 3600, tags: ['persona-config'] }
);

// Cache the image URLs for 1.5 hours (to avoid regenerating too frequently)
// Note: Cache key includes userId to ensure each user has their own cached URLs
const getCachedImageUrls = unstable_cache(
	async (userId: string, s3Folder: string, captions: string[]) => {
		return generatePresignedUrls(s3Folder, captions);
	},
	['image-urls'],
	{ revalidate: 5400, tags: ['image-urls'] } // 1.5 hours
);

async function generatePresignedUrls(
	s3Folder: string,
	captions: string[] = []
): Promise<Array<{ url: string; caption: string }>> {
	try {
		console.log(`[Images] Fetching images from S3 folder: ${s3Folder}`);

		// Parse the S3 URI to extract bucket and folder path
		const { bucket, folderPath } = parseS3Uri(s3Folder);
		console.log(`[Images] Parsed - Bucket: ${bucket}, Folder: ${folderPath}`);

		// List all objects in the folder
		const listCommand = new ListObjectsV2Command({
			Bucket: bucket,
			Prefix: folderPath
		});

		const listResponse = await s3Client.send(listCommand);

		if (!listResponse.Contents || listResponse.Contents.length === 0) {
			console.log('[Images] No images found in folder');
			return [];
		}

		// Filter for image files (jpg, jpeg, png, gif, webp)
		const imageExtensions = [
			'.jpg',
			'.jpeg',
			'.png',
			'.gif',
			'.webp',
			'.JPG',
			'.JPEG',
			'.PNG',
			'.GIF',
			'.WEBP'
		];
		const imageObjects = listResponse.Contents.filter((obj) => {
			const key = obj.Key || '';
			return imageExtensions.some((ext) => key.endsWith(ext));
		});

		console.log(`[Images] Found ${imageObjects.length} images`);

		// Fallback captions if none provided from config
		const defaultCaptions = [
			'Caption 1 😤',
			'Caption 2 🙈',
			'Caption 3 ✨',
			'Caption 4 📸',
			'Caption 5 😊',
			'Caption 6 🌟',
			'Caption 7 💫',
			'Caption 8 🌸',
			'Caption 9 💕',
			'Caption 10 💝',
			'Caption 11 🎉',
			'Caption 12 ☀️',
			'Caption 13 🌟',
			'Caption 14 💖'
		];

		const captionsToUse = captions.length > 0 ? captions : defaultCaptions;

		// Generate pre-signed URLs for each image with captions
		const presignedUrlsWithCaptions = await Promise.all(
			imageObjects.map(async (obj, index) => {
				const command = new GetObjectCommand({
					Bucket: bucket,
					Key: obj.Key
				});

				const url = await getSignedUrl(s3Client, command, {
					expiresIn: URL_EXPIRATION_SECONDS
				});

				// Cycle through captions if we have more images than captions
				const caption = captionsToUse[index % captionsToUse.length];

				return { url, caption };
			})
		);

		return presignedUrlsWithCaptions;
	} catch (error) {
		console.error('[Images] Error generating pre-signed URLs:', error);
		throw error;
	}
}

async function getImagesHandler(
	req: NextRequest,
	auth: AuthContext
): Promise<NextResponse> {
	try {
		const userId = auth.payload.token_id;

		console.log(`[Images] Fetching images for user: ${userId}`);

		// Get persona config from Supabase
		const config = await getCachedPersonaConfig(userId);

		if (!config) {
			return NextResponse.json(
				{ error: 'Configuration not found' },
				{ status: 404 }
			);
		}

		if (!config.s3_folder) {
			return NextResponse.json(
				{ error: 'S3 folder not configured' },
				{ status: 400 }
			);
		}

		// Get cached pre-signed URLs (or generate new ones)
		// Pass captions from config to the cache function
		const imageUrls = await getCachedImageUrls(
			userId,
			config.s3_folder,
			config.image_captions || []
		);

		return NextResponse.json({
			success: true,
			images: imageUrls,
			count: imageUrls.length,
			expiresIn: URL_EXPIRATION_SECONDS
		});
	} catch (error) {
		console.error('[Images] Error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch images' },
			{ status: 500 }
		);
	}
}

async function patchCacheHandler(
	req: NextRequest,
	auth: AuthContext
): Promise<NextResponse> {
	try {
		const userId = auth.payload.token_id;

		console.log(`[Images] Cache clear requested by user: ${userId}`);

		// Clear both cache tags to ensure complete cache purge
		revalidateTag('persona-config');
		revalidateTag('image-urls');

		console.log(
			'[Images] Cache purged successfully for both persona-config and image-urls'
		);

		return NextResponse.json({
			success: true,
			message: 'Cache purged successfully for persona config and image URLs',
			tags: ['persona-config', 'image-urls'],
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('[Images] Error purging cache:', error);
		return NextResponse.json(
			{ error: 'Failed to purge cache', details: String(error) },
			{ status: 500 }
		);
	}
}

export const GET = withAuthHeaders(getImagesHandler);
export const PATCH = withAuthHeaders(patchCacheHandler);
