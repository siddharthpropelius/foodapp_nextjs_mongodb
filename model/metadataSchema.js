import mongoose from 'mongoose';

const metadataSchema = new mongoose.Schema({
  name: String,
  title: String,
  des: String,
});

module.exports =
  mongoose.models.MetaData || mongoose.model('MetaData', metadataSchema);
