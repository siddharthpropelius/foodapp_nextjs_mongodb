import connect from '../../../lib/mongodb';
import Cart from '../../../model/cartSchema';

connect();

export default async function handler(req, res) {
  try {
    const find = await Cart.find({ user: req.body.user, item: req.body.item });
    if (find[0].quantity === 1) {
      await Cart.deleteOne({ item: req.body.item });
      res.send('removed from cart');
    } else {
      const update = await Cart.updateOne(
        {
          item: req.body.item,
        },
        {
          $inc: {
            quantity: -1,
          },
          total: req.body.price * (find[0].quantity + 1),
        }
      );
      res.send('Item -1 from  Cart');
    }
  } catch (error) {
    res.send(error);
    // res.status(400).json({ status: 'Something went wrong while adding food' });
  }
}
