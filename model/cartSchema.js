import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  item: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  Rid: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  total: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
