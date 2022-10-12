import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(
    'mongodb+srv://siddharth:L5QL2tQtrfNMgNu8@cluster.4netzw0.mongodb.net/?retryWrites=true&w=majority'
  );

  connection.isConnected = db.connections[0].readyState;
}

export default connect;
