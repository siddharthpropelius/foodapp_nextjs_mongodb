import connect from '../../../lib/mongodb';
import FoodList from '../../../model/foodListSchema';

connect();

export default async function handler(req, res) {
  const category = req.body;
  const food = await FoodList.find(category);
  res.json(food);
}
