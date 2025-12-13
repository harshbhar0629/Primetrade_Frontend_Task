/** @format */

import { Link } from "react-router-dom";

const Navbar = () => {
	const token = localStorage.getItem("token");

	return (
		<nav className="flex justify-between p-4 bg-gray-900 text-white">
			<Link
				to="/"
				className="font-bold">
				Blogify
			</Link>
			<div className="space-x-4">
				{!token && <Link to="/login">Login</Link>}
				{!token && <Link to="/signup">Signup</Link>}
				{token && <Link to="/create">Create Blog</Link>}
				{token && <Link to="/dashboard">Dashboard</Link>}
			</div>
		</nav>
	);
};

export default Navbar;
