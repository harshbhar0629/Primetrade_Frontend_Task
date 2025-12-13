/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", data);
			localStorage.setItem("token", res.data.token);
			toast.success("Logged in");
			navigate("/dashboard");
		} catch {
			toast.error("Invalid credentials");
		}
	};

	return (
		<form
			onSubmit={submit}
			className="max-w-md mx-auto mt-10">
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
			<button className="bg-black text-white p-2 w-full">Login</button>
		</form>
	);
};

export default Login;
