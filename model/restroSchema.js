import mongoose from 'mongoose';

const restroSchema = new mongoose.Schema({
  Rid: String,
  name: String,
  img: String,
  des: String,
  location: String,
});

module.exports =
  mongoose.models.Restro || mongoose.model('Restro', restroSchema);
