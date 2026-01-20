import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/student-management-system");
        console.log("Connected to MongoDB");

        const email = "abdihasan@gmail.com";
        const newPassword = "admin123";

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User not found: ${email}`);
            return;
        }

        user.password = newPassword;
        await user.save();

        console.log(`Password for ${email} has been reset to: ${newPassword}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
};

resetAdmin();
