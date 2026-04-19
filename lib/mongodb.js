import mongoose from 'mongoose';

let cachedConnection = null;

export async function connectDB() {
  if (cachedConnection) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('❌ MONGODB_URI environment variable not defined');
    }

    console.log('🔗 Connecting to MongoDB...');

    const connection = await mongoose.connect(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 60000,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });

    cachedConnection = connection;
    console.log('✅ MongoDB Connected Successfully');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    throw error;
  }
}

export default connectDB;
