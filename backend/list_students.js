import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Student from './models/Student.js';

dotenv.config();

async function listStudents() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sms_db_s');
        const students = await Student.find().populate('userId', 'firstName lastName email role');
        console.log('--- Current Students in Database ---');
        students.forEach(s => {
            console.log(`Student ID: ${s._id}`);
            console.log(`User ID: ${s.userId?._id}`);
            console.log(`Name: ${s.userId?.firstName} ${s.userId?.lastName}`);
            console.log(`Email: ${s.userId?.email}`);
            console.log(`Enrollment: ${s.enrollmentNumber}`);
            console.log('------------------------------------');
        });
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

listStudents();
