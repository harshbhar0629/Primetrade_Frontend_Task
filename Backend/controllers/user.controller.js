/** @format */

import bcrypt from "bcryptjs";
import User from "../models/UserSchema.js";

export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.status(200).json({ success: true, user });
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			success: false,
			message: String(err.message),
			data: String(err),
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		console.log(user);
		const data = req.body;
		delete data.password;
		delete data.email;

		Object.assign(user, data);
		await user.save();
		return res
			.status(200)
			.json({ success: true, message: "User profile updated", user });
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "Error in updating user profile",
			data: String(err),
		});
	}
};

export const deleteProfile = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await User.findById(req.user.id);

		if (!(await bcrypt.compare(password, user.password)))
			return res.status(400).json({ message: "Wrong password" });

		await user.findByIdAndDelete(req.user.id);
		return res
			.status(200)
			.json({ success: true, message: "Profile deleted Successfully" });
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: "Error in deleting user profile",
			data: String(err),
		});
	}
};
