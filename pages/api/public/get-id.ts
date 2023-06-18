import { generateUniqueID } from '@/utils/fe/apis/analytics/generateUniqueID';
import { NextApiHandler } from 'next';
const handler: NextApiHandler = (req, res) => {
	const b64String = req.headers['x-ms-request-header'];
	if (typeof b64String !== 'string') return res.status(204).end();
	const uniqueID = generateUniqueID(b64String);
	if (!uniqueID.length) return res.status(204).end();
	res.setHeader('Set-Cookie', `as-id=${uniqueID}; Path=/; Max-Age=31536000`);
	return res.status(200).json({ id: generateUniqueID(b64String) });
};

export default handler;
