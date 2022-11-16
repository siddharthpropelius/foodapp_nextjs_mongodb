import connect from '../../../lib/mongodb';
import FoodList from '../../../model/foodListSchema';

connect();

export default async function handler(req, res) {
  const find = await FoodList.find({
    $or: [{ name: req.body }, { category: req.body }],
  });
  res.send({ res: find });
}
