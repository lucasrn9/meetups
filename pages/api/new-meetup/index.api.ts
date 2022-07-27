import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import createPoolPromise from '../../../functions/createPoolPromise';
import meetupSchema from '../../../schemas/meetup';
import runMiddleware from '../../../middlewares/runMiddleware';

const poolPromise = createPoolPromise();

const limiter = rateLimit({
  keyGenerator: (request) => request.socket.remoteAddress as string,
  windowMs: 1000 * 60 * 60 * 24,
  max: 3,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, limiter);
    } catch {
      return res.status(429).send('too many requests');
    }

    const data = req.body;
    let meetup;
    try {
      meetup = await meetupSchema.validate(data);
    } catch (err) {
      return res.status(400).send(err);
    }
    const sqlInsert =
      'INSERT INTO meetup(title,image_url,street,city,number,description) VALUES (?,?,?,?,?,?)';
    try {
      await poolPromise.execute(sqlInsert, [
        meetup.meetupTitle,
        meetup.meetupImage,
        meetup.street,
        meetup.city,
        meetup.number,
        meetup.description,
      ]);
      await res.unstable_revalidate('/');
      return res.send({ message: 'success' });
    } catch {
      return res.status(500).send('something in your request went wrong');
    }
  }
  return res.status(404).send({ error: 'Invalid http method' });
};

export default handler;
