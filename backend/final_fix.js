import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Student from './models/Student.js';

dotenv.config();

async function fixAll() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({ role: 'student' });
        console.log(`Checking ${users.length} student users...`);

        for (const user of users) {
            const exists = await Student.findOne({ userId: user._id });
            if (!exists) {
                console.log(`Creating profile for ${user.email}...`);
                const enrollmentNumber = `STU${Date.now()}${Math.floor(Math.random() * 1000)}`;
                await new Student({
                    userId: user._id,
                    enrollmentNumber: enrollmentNumber,
                    status: 'enrolled'
                }).save();
            } else {
                console.log(`Profile exists for ${user.email}.`);
            }
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixAll();
