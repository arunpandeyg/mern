import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI!);
        console.log(`"Connected to MongoDB": ${connection.connection.host}`);
    } catch (error) {

        console.error("Error connecting to MongoDB:", error);
        throw error;

    }
};

export default connectToMongoDB;