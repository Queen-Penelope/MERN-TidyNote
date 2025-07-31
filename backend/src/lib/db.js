import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connecting to database successfully");
    } catch (error) {
        console.log("ERROR in DB connection", error);
        process.exit(1);
    }
};

