/** @format */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [profile, setProfile] = useState({});
	const [blogs, setBlogs] = useState([]);
	const [password, setPassword] = useState("");

	useEffect(() => {
		
	}, []);

	const updateProfile = async () => {
		toast.success("Profile updated");
	};

	const deleteProfile = async () => {
		if (!password) return toast.error("Password required");
		try {
			localStorage.removeItem("token");
			toast.success("Profile deleted");
			window.location.href = "/signup";
		} catch {
			toast.error("Wrong password");
		}
	};

	return (
		<div className="p-6 max-w-5xl mx-auto">
			{/* PROFILE */}
			<h2 className="text-2xl font-bold mb-3">Profile</h2>
			<input
				className="border p-2 w-full mb-2"
				value={profile.name || ""}
				onChange={(e) => setProfile({ ...profile, name: e.target.value })}
			/>
			<input
				className="border p-2 w-full mb-2"
				placeholder="Phone"
				value={profile.phone || ""}
				onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
			/>
			<input
				className="border p-2 w-full mb-2"
				placeholder="College"
				value={profile.college || ""}
				onChange={(e) => setProfile({ ...profile, college: e.target.value })}
			/>

			<button
				onClick={updateProfile}
				className="bg-blue-600 text-white p-2 mb-6">
				Update Profile
			</button>

			{/* DELETE PROFILE */}
			<div className="border p-4 mb-6">
				<h3 className="font-bold text-red-600">Delete Profile</h3>
				<input
					type="password"
					placeholder="Confirm Password"
					className="border p-2 w-full mb-2"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					onClick={deleteProfile}
					className="bg-red-600 text-white p-2 w-full">
					Delete Profile
				</button>
			</div>

			{/* USER BLOGS */}
			<h2 className="text-2xl font-bold mb-3">My Blogs</h2>
			{blogs.map((blog) => (
				<div
					key={blog._id}
					className="border p-3 mb-2 flex justify-between">
					<span>{blog.title}</span>
					<Link
						to={`/edit/${blog._id}`}
						className="text-blue-600">
						Edit
					</Link>
				</div>
			))}
		</div>
	);
};

export default Dashboard;
