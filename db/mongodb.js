import mongoose from 'mongoose';

// MongoDB connection pool configuration for traditional server
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
      // Connection pool: sized for typical server workload
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 60000,

      // Timeout settings for reliable connectivity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,

      // Write concern and reliability
      retryWrites: true,
      w: 'majority'
    });

    cachedConnection = connection;
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${connection.connection.name}`);
    return connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
}

export default connectDB;
