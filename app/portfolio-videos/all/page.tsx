// app/videos/page.tsx
import { listVideos } from '@/components/v4/AllVideos/videos';
import InfiniteVideoGridClient from '@/components/v4/AllVideos/InfiniteVideoGrid.client';

const LIMIT = 6;

export default async function Page() {
    const { items, total } = await listVideos({ limit: LIMIT, skip: 0 });
    return <InfiniteVideoGridClient initialItems={items} total={total} limit={LIMIT} />;
}
