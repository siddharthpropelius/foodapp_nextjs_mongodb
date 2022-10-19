import connect from '../../../lib/mongodb';
import Restro from '../../../model/restroSchema';

connect();

export default async function handler(req, res) {
  const restro = await Restro.find({});
  res.json({ res: restro });
}
