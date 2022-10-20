import connect from '../../../lib/mongodb';
import Order from '../../../model/orderSchema';

connect();

export default async function handler(req, res) {
  try {
    await Order.create(req.body.cart);
    res.send('Order Placed Successfully');
  } catch (error) {
    res.send(error);
  }
}
