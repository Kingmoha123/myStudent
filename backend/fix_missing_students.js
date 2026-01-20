import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Student from './models/Student.js';

dotenv.config();

async function fixStudentProfiles() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sms_db_s');
        console.log('Connected to MongoDB');

        const studentUsers = await User.find({ role: 'student' });
        console.log(`Found ${studentUsers.length} users with role "student".`);

        for (const user of studentUsers) {
            const studentProfile = await Student.findOne({ userId: user._id });

            if (!studentProfile) {
                console.log(`Creating profile for ${user.firstName} ${user.lastName} (${user.email})...`);

                // Generate a simple enrollment number if missing
                const enrollmentNumber = `STU${Date.now()}${Math.floor(Math.random() * 1000)}`;

                const newStudent = new Student({
                    userId: user._id,
                    enrollmentNumber: enrollmentNumber,
                    status: 'enrolled'
                });

                await newStudent.save();
                console.log(`Profile created with enrollment number: ${enrollmentNumber}`);
            } else {
                console.log(`Profile already exists for ${user.firstName} ${user.lastName}.`);
            }
        }

        console.log('Finished fixing student profiles.');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing student profiles:', error);
        process.exit(1);
    }
}

fixStudentProfiles();
