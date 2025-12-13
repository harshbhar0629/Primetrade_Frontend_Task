/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		try {
			
			toast.success("Account created successfully");
			navigate("/login");
		} catch {
			toast.error("Signup failed");
		}
	};

	return (
		<form
			onSubmit={submit}
			className="max-w-md mx-auto mt-10">
			<input
				className="border p-2 w-full mb-3"
				placeholder="Name"
				onChange={(e) => setData({ ...data, name: e.target.value })}
			/>
			<input
				className="border p-2 w-full mb-3"
				placeholder="Email"
				onChange={(e) => setData({ ...data, email: e.target.value })}
			/>
			<input
				type="password"
				className="border p-2 w-full mb-3"
				placeholder="Password"
				onChange={(e) => setData({ ...data, password: e.target.value })}
			/>
			<button className="bg-black text-white p-2 w-full">Signup</button>
		</form>
	);
};

export default Signup;
