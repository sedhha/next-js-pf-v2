import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import workExperience from "@/constants/cms-constants/backend/we.json";
import { IWork } from '@/interfaces/work';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<IWork[]>) => {
    const { limit, skip } = req.query;
    console.info(`[GET]: [Work Experience] - Limit:${limit} | Skip:${skip} | ${req.url}`);
    const result = (workExperience as IWork[]).slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3));
    const noData = result.length === 0;
    return res.status(noData ? 204 : 200).json(result);
}
export default handler;