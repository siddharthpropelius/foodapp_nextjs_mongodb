import connect from '../../../lib/mongodb';
import Restro from '../../../model/restroSchema';

connect();

export default async function handler(req, res) {
  const id = req.body;
  const restro = await Restro.find({ Rid: id });
  res.json({ res: restro });
}
