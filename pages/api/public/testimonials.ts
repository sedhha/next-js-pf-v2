import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import testimonials from "@/constants/cms-constants/backend/testimonial.json";
import { ITotal } from '@/interfaces/api';
import { ITestimonials } from "@/interfaces/testimonials";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<ITotal<ITestimonials>>) => {
    const { limit, skip } = req.query;
    console.info(`[${req.method}]: [Testimonial] - Limit:${limit?.toString().padStart(2, '0')} | Skip:${skip?.toString().padStart(2, '0')} | ${req.url}`);
    const result = testimonials.slice(+(skip ?? 0), +(skip ?? 0) + +(limit ?? 3));
    const noData = result.length === 0;
    return res.status(noData ? 204 : 200).json({ items: result, total: testimonials.length });
}
export default handler;