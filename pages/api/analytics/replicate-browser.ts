import { NextApiHandler } from 'next';
const handler: NextApiHandler = (req, res) => {
	return res.status(200).json({
		headers: req.headers,
		body: req.body,
		query: req.query,
		cookies: req.cookies,
		rawHeaders: req.rawHeaders
	});
};

export default handler;
