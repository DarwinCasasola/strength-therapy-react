import mongoose from 'mongoose';

export default async function connectDB(uri) {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'strength_therapy' });
  console.log('MongoDB connected');
}
