import mongoose from "mongoose";
import { environment } from "../environment/environment.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(environment.database.MONGOOSE_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw error to handle it in the main file
  }
};

export { connectDatabase };
