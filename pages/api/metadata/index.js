import connect from '../../../lib/mongodb';
import MetaData from '../../../model/metadataSchema';

connect();

export default async function handler(req, res) {
  const name = req.body;
  const find = await MetaData.find({ name: name });
  res.json({ res: find });
}
