/** @format */

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToken, setUserData } from "../../redux/slices/userSlices";

const Navbar = () => {
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setToken(null));
		dispatch(setUserData(null));
	};
	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black shadow-lg">
			<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
				<Link
					to="/"
					className="font-extrabold text-3xl tracking-wide text-white hover:text-indigo-400 transition">
					Blogify
				</Link>

				<div className="flex items-center gap-6 text-lg">
					{!token && (
						<Link
							to="/login"
							className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-400 transition">
							Login
						</Link>
					)}
					{!token && (
						<Link
							to="/signup"
							className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-400 transition">
							Signup
						</Link>
					)}
					{token && (
						<Link
							to="/create"
							className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
							Create Blog
						</Link>
					)}
					{token && (
						<Link
							to="/dashboard"
							className="hover:text-indigo-400 transition">
							Dashboard
						</Link>
					)}
					{token && (
						<Link
							to="/"
							className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
							onClick={handleLogout}>
							Log Out
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
