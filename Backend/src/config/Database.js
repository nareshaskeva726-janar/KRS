import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED SUCCESSFULY!")
    } catch (error) {
        console.log("Error in the connectDB function!", error);
        process.exit(1);
    }
}

export default connectDB;