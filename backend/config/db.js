import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected balle balle");
  } catch (error) {
    console.log("db error");
  }
};
export default connectDb;
