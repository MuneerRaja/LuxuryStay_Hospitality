const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri && process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI must be configured in production');
    }

    await mongoose.connect(mongoUri || 'mongodb://localhost:27017/hotel_management');
    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}:${mongoose.connection.port}`);

  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    throw error;
  }
};

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

module.exports = { connectDatabase };
