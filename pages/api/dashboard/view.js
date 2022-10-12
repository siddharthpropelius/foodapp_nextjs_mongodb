import connect from '../../../lib/mongodb';
import FoodList from '../../../model/foodListSchema';

connect();

export default async function handler(req, res) {
  const food = await FoodList.find({});
  res.json({ res: food });
}
