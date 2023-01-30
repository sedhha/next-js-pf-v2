import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/firebase/index";
import { info } from '@/utils/dev-utils';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    info(`[${req.method}]: [Firebase] | ${req.url}`);
    return res.status(200).json({ name: auth.app.name ?? "Not Reachable" });
}
export default handler;