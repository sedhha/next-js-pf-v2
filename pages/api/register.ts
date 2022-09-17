import { NextApiHandler } from 'next';
import { client } from 'utils/superbase';

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const { user, session, error } = await client.auth.signUp({
    email,
    password,
  });
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(201).json({ user: user, session: session });
};

export default handler;
