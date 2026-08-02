import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`"DB connected" ${conn.connection.host}`);
  } catch (error) {
    console.log("error to connect DB");
    process.exit(1);
  }
};
