import mongoose from "mongoose";
import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error("Database connection failed:", err.message);
    });
};

export default connectDB;
