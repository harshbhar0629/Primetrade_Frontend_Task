/** @format */

import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB Connected");
	} catch (err) {
		console.log("db error ", err.message);
	}
};

export default connectDB;
