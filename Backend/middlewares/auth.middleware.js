/** @format */

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
	const token =
		req.cookies.token ||
		req.body.token ||
		req.header("Authorization").replace("Bearer ", "");
	if (!token) return res.status(401).json({ message: "Unauthorized User token missing" });

	try {
		// Verifying the JWT using the secret key stored in environment variables
		const decode = await jwt.verify(token, process.env.JWT_SECRET);
		console.log(decode);
		// Storing the decoded JWT payload in the request object for further use
		req.user = decode;
		next();
	} catch {
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

export default authMiddleware;
