import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import projects from "@/constants/cms-constants/backend/projects.json";
import { ITotal } from '@/interfaces/api';
import { IProject } from '@/interfaces/projects';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<ITotal<IProject>>) => {
    const { limit, skip } = req.query;
    console.info(`[${req.method}]: [Projects] - Limit:${limit?.toString().padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`);
    const result = (projects as IProject[]).slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3));
    const noData = result.length === 0;
    return res.status(noData ? 204 : 200).json({ items: result, total: projects.length });
}
export default handler;