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

	const buttonClass =
		"px-4 py-2 rounded-lg bg-indigo-600 text-white \
		hover:bg-indigo-500 hover:shadow-lg \
		transition-all duration-300 ease-in-out";

	return (
		<nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black shadow-lg">
			<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
				<Link
					to="/"
					className="font-extrabold text-3xl tracking-wide text-white hover:text-indigo-400 transition duration-300">
					Blogify
				</Link>

				<div className="flex items-center gap-5 text-lg">
					{!token && (
						<Link
							to="/login"
							className={buttonClass}>
							Login
						</Link>
					)}

					{!token && (
						<Link
							to="/signup"
							className={buttonClass}>
							Signup
						</Link>
					)}

					{token && (
						<Link
							to="/create"
							className={buttonClass}>
							Create Blog
						</Link>
					)}

					{token && (
						<Link
							to="/dashboard"
							className={buttonClass}>
							Dashboard
						</Link>
					)}

					{token && (
						<Link
							to="/"
							onClick={handleLogout}
							className={buttonClass}>
							Log Out
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
