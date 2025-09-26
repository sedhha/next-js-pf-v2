// components/v4/AllVideos/videos.ts
import { Paged, VideoContent } from '@/components/v4/AllVideos/types';
import raw from '@/constants/cms-constants/backend/videos.json'; // tsconfig: "resolveJsonModule": true

function uniqueById(arr: VideoContent[]): VideoContent[] {
	const m = new Map<string, VideoContent>();
	for (const v of arr) if (!m.has(v.id)) m.set(v.id, v);
	return Array.from(m.values());
}

function sortByDateDesc(arr: VideoContent[]) {
	return [...arr].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

const ALL_VIDEOS: VideoContent[] = sortByDateDesc(
	uniqueById(raw as VideoContent[])
);

type Args = { limit?: number; skip?: number };

export function listVideos({ limit = 6, skip = 0 }: Args): Paged<VideoContent> {
	const start = Math.max(0, Math.trunc(skip ?? 0));
	const lim = Math.max(1, Math.trunc(limit ?? 6));
	const end = Math.min(ALL_VIDEOS.length, start + lim);

	const items = ALL_VIDEOS.slice(start, end);
	return { items, total: ALL_VIDEOS.length, limit: lim, skip: start };
}

export function formatDate(dateString: string) {
	const [y, m, d] = dateString.split('T')[0].split('-').map(Number);
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	return `${months[m - 1]} ${d}, ${y}`;
}
