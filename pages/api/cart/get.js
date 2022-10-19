import connect from '../../../lib/mongodb';
import Cart from '../../../model/cartSchema';

connect();

export default async function handler(req, res) {
  try {
    const find = await Cart.find({ user: req.body });
    res.send(find);
  } catch (error) {
    res.send(error);
    // res.status(400).json({ status: 'Something went wrong while adding food' });
  }
}
