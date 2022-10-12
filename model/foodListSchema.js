import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Rid: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.FoodList || mongoose.model('FoodList', foodSchema);
