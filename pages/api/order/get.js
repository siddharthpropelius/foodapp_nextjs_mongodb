import connect from '../../../lib/mongodb';
import Order from '../../../model/orderSchema';

connect();

export default async function handler(req, res) {
  try {
    const find = await Order.find({ user: req.body });
    console.log(find);
    res.send(find);
  } catch (error) {
    res.send(error);
  }
}
