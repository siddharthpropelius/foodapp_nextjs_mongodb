import connect from '../../../lib/mongodb';
import FoodList from '../../../model/foodListSchema';

connect();

export default async function handler(req, res) {
  try {
    const food = await FoodList.create(req.body);
    res.redirect('/dashboard');

    if (!food) {
      return res.json({ code: 'Food did not added' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'Something went wrong while adding food' });
  }
}
