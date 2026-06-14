import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODBURL;

    if (!mongoURL) {
      throw new Error("MONGODBURL is missing in .env file");
    }

    await mongoose.connect(mongoURL);

    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;