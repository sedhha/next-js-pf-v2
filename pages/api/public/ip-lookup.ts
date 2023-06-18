import { ipLookup } from '@/backend/geolocation/ipLookup';
import { NextApiHandler } from 'next';
const handler: NextApiHandler = async (req, res) => {
	const userIP = req.headers['x-client-ip'];
	if (typeof userIP !== 'string')
		return res.status(200).json({ success: false });
	return res.status(200).json(await ipLookup(userIP));
};

export default handler;
