/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	try {
		console.log("trying to connect db");
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB Connected");
	} catch (err) {
		console.log("db error ", err.message);
	}
};

export default connectDB;
