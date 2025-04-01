import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://fashion:Krushil%4026082000@fashion-ecom.jmchh.mongodb.net/fashionDB?retryWrites=true&w=majority"


if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        await mongoose.connect(MONGODB_URI, {
            dbName: "fashionDB", // Change this to your actual database name
        });

        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Database connection failed");
    }
};
