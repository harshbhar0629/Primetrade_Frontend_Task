/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { AuthApi } from "../../Apis/api";
import { useDispatch } from "react-redux";

const Login = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submit = async (e) => {
		e.preventDefault();
		const id = toast.loading("loading..");
		try {
			await AuthApi("post", "/login", data, dispatch);
			toast.dismiss(id);
			toast.success("Logged in Successfully!");
			navigate("/dashboard");
		} catch {
			toast.dismiss(id);
			toast.error("Invalid credentials");
		}
	};

	return (
		<div className="min-h-screen mt-[-62px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
			<form
				onSubmit={submit}
				className="w-full max-w-md bg-white/10 mt-[-10px] backdrop-blur-xl p-8 rounded-2xl shadow-2xl animate-fadeIn">
				<h2 className="text-4xl font-extrabold text-center text-white mb-6">
					Welcome Back 👋
				</h2>

				<p className="text-center text-gray-300 mb-8">
					Login to continue to <span className="font-semibold">Blogify</span>
				</p>

				<div className="space-y-5">
					<input
						className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800
						           focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
						placeholder="Email"
						onChange={(e) => setData({ ...data, email: e.target.value })}
					/>

					<input
						type="password"
						className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800
						           focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
						placeholder="Password"
						onChange={(e) => setData({ ...data, password: e.target.value })}
					/>
				</div>

				<button
					type="submit"
					className="mt-8 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg
					           hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
					Login
				</button>

				<p className="text-center text-gray-300 mt-6 text-sm">
					Don’t have an account?{" "}
					<Link
						to="/signup"
						className="text-indigo-400 hover:text-indigo-300 hover:underline transition">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
