import connect from '../../../lib/mongodb';
import Order from '../../../model/orderSchema';

connect();

export default async function handler(req, res) {
  const orderID = req.body;
  try {
    const find = await Order.find({ _id: orderID });
    res.send(find);
  } catch (error) {
    res.send(error);
  }
}
