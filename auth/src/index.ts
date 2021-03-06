import mongoose from 'mongoose';
import app from './app';

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error(`JWT_SECRET env variable must be defined.`);
  }

  if (!process.env.MONGO_URI) {
    throw new Error(`MONGO_URI env variable must be defined.`);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Connected to MongoDb.`);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, async () => {
    console.log(`Listening on http://localhost:3000`);
  });
};

start();
