/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return (
				res.status(400),
				json({
					success: false,
					messsage: "Data missing",
				})
			);
		}

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashed });
		const userObj = JSON.parse(JSON.stringify(user));
		const token = await createToken(userObj);
		if (!token) {
			await User.findByIdAndDelete({ id: user._id });
		}

		const options = {
			expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};

		delete userObj.password;
		res.cookie("token", token, options).status(200).json({
			success: true,
			token,
			userObj,
			message: `Account Created Successfully!`,
		});
	} catch (err) {
		console.log(err.message);
		return res
			.status(400)
			.json({ success: false, message: err.message, data: String(err) });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	console.log("inside login");

	try {
		const user = await User.findOne({ email });
		const userObj = JSON.parse(JSON.stringify(user));
		if (!userObj || !(await bcrypt.compare(password, userObj.password)))
			return res.status(401).json({ message: "Invalid credentials" });

		const token = await createToken(userObj);

		const options = {
			expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		delete userObj.password;
		res?.cookie("token", token, options).status(200).json({
			success: true,
			token,
			userObj,
			message: `User Login Successfully!`,
		});
	} catch (err) {
		return res
			.status(400)
			.json({ success: false, message: err.message, data: String(err) });
	}
};

const createToken = (user) => {
	try {
		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h",
			}
		);

		return token;
	} catch (err) {
		return "";
	}
};
