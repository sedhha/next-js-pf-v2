import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import categoryArticles from '@/constants/cms-constants/backend/category-articles.json';
import { ICategoryArticles } from '@/interfaces/index';
import { ITotal } from '@/interfaces/api';



const handler: NextApiHandler = (
    req: NextApiRequest,
    res: NextApiResponse<ITotal<ICategoryArticles>>
) => {
    const { limit, skip, category } = req.query;
    console.info(
        `[GET]: [Category Articles] - Limit:${limit} | Skip:${skip} | ${req.url}`
    );
    const result = (categoryArticles[
        (category ?? '') as string as keyof typeof categoryArticles
    ] ?? []).slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3)).map(item => ({ ...item, title: item.title + '-' + skip + '-' + limit }));
    const noData = result.length === 0;
    return res.status(noData ? 204 : 200).json({
        items: result as ICategoryArticles[],
        total: (categoryArticles[
            (category ?? '') as string as keyof typeof categoryArticles
        ] ?? []).length
    });
};
export default handler;