import connect from '../../../lib/mongodb';
import FoodList from '../../../model/foodListSchema';

connect();

export default async function handler(req, res) {
  const Rid = req.body.Rid.toString();
  const category = req.body.category;
  if (category === 'recommended') {
    const find = await FoodList.find({ Rid: Rid }).limit(5);
    res.json({ res: find });
  } else {
    const find = await FoodList.find({ Rid: Rid, category: category });
    res.json({ res: find });
  }
}
