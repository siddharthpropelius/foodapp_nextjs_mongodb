import connect from '../../../lib/mongodb';
import User from '../../../model/userSchema';

connect();

export default async function handler(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.json({ error: 404 });
  } else {
    // res.redirect('/home');
    res.json(user);
  }
}
