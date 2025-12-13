/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {type: String},
		email: { type: String, unique: true, required: true },
		password: {type: String, required: true},
		phone: {type: String},
        college: { type: String },
        description: {type: String}
	},
	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
