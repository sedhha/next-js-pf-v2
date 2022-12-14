import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import workExperience from "@/constants/cms-constants/backend/we.json";
import { IWork } from '@/interfaces/work';
import { ITotal } from '@/interfaces/api';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<ITotal<IWork>>) => {
    const { limit, skip } = req.query;
    console.info(`[${req.method}]: [Work Experience] - Limit:${limit?.toString().padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`);
    const result = (workExperience as IWork[]).slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3));
    const noData = result.length === 0;
    return res.status(noData ? 204 : 200).json({ items: result, total: workExperience.length });
}
export default handler;