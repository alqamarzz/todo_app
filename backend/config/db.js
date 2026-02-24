const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("DEBUG MONGO_URI:", process.env.MONGO_URI); // 👈 add this

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;