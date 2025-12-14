/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

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
		<div className="min-h-screen mt-[-62px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
			<form
				onSubmit={submit}
				className="w-full mt-3 max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl animate-fadeIn">
				<h2 className="text-4xl font-extrabold text-center text-white mb-6">
					Create Account ✨
				</h2>

				<p className="text-center text-gray-300 mb-8">
					Join <span className="font-semibold">Blogify</span> today
				</p>

				<div className="space-y-5">
					<input
						className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800
						           focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
						placeholder="Full Name"
						onChange={(e) => setData({ ...data, name: e.target.value })}
					/>

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
					Signup
				</button>

				<p className="text-center text-gray-300 mt-6 text-sm">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-indigo-400 hover:text-indigo-300 hover:underline transition">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Signup;
