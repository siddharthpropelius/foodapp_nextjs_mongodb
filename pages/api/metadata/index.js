import connect from '../../../lib/mongodb';
import MetaData from '../../../model/metadataSchema';

connect();

export default async function handler(req, res) {
  const name = req.body;
  console.log('NAME', name);
  const find = await MetaData.find({ name: name });
  res.send({ res: find });
}
