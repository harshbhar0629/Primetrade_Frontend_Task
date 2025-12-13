/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `Account Created Successfully!`,
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: "Invalid credentials" });

        const token = await createToken(user);
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cokkie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Successfully!`,
        });
    } catch (err) {}
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
    } catch (err) {}
};
