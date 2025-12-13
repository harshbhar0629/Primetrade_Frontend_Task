/** @format */

import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");
	res.json(user);
};

export const updateProfile = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
	}).select("-password");

	res.json(user);
};

export const deleteProfile = async (req, res) => {
	const { password } = req.body;
	const user = await User.findById(req.user.id);

	if (!(await bcrypt.compare(password, user.password)))
		return res.status(400).json({ message: "Wrong password" });

	await user.deleteOne();
	res.json({ message: "Profile deleted" });
};
