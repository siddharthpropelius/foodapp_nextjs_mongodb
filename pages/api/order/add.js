import connect from '../../../lib/mongodb';
import Order from '../../../model/orderSchema';
import Cart from '../../../model/cartSchema';
connect();

export default async function handler(req, res) {
  try {
    console.log('date', req.body);
    const user = req.body.cart[0].user;

    const create = await Order.create(req.body.cart);
    console.log(create);
    await Cart.deleteMany({
      user: user,
    });
    res.send('Order Placed Successfully');
  } catch (error) {
    res.send(error);
    // res.status(400).json({ status: 'Something went wrong while adding food' });
  }
}
