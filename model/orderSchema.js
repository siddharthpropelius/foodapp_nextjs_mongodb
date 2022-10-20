import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
  price: {
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
  date: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
