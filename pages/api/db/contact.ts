import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { IContactForm } from '@/interfaces/firebase/contact-form';
import { IResponse } from '@/interfaces/api';
import { uploadToStore } from '@/firebase/uploadContact';



const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IResponse<null>>
) => {
    const payload = req.body as IContactForm;
    console.info(
        `[${req.method}]: [Contact Form] - Email: ${payload.email} | ${req.url}`
    );
    const response = await uploadToStore(payload);
    return res.status(response.statusCode).json(response);
};
export default handler;
