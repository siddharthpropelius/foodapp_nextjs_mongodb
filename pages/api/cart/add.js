import connect from '../../../lib/mongodb';
import Cart from '../../../model/cartSchema';

connect();

export default async function handler(req, res) {
  try {
    const find = await Cart.find({ user: req.body.user, item: req.body.item });

    if (find.length === 0) {
      const user = await Cart.create({
        item: req.body.item,
        name: req.body.name,
        img: req.body.img,
        category: req.body.category,
        price: req.body.price,
        user: req.body.user,
        quantity: req.body.quantity,
        total: req.body.price * req.body.quantity,
        date: new Date(),
      });
      console.log(user);
      res.send('item added to cart');
    } else {
      if (find[0].quantity < 5) {
        console.log('TOTAL::::>>>>>', req.body.price * (find[0].quantity + 1));
        const update = await Cart.updateOne(
          {
            item: req.body.item,
          },
          {
            total: req.body.price * (find[0].quantity + 1),

            $inc: {
              quantity: 1,
            },
          }
        );
        console.log(update);
        res.send('Item Added to Cart');
      } else {
        res.send('Cannot Add More than 5 Items');
      }
    }
  } catch (error) {
    res.send(error);
  }
}
