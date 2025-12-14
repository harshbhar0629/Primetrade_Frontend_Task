/** @format */

import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserApi } from "../../Apis/api";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
	const userData = useSelector((state) => state?.auth?.userData);
	const [profile, setProfile] = useState({
		name: userData?.name,
		college: userData?.college,
		phone: userData?.phone,
		description: userData?.description,
	});
	const [blogs, setBlogs] = useState([]);
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState("profile");

	const updateProfile = async () => {
		try {
			const res = UserApi("put", "/update", profile, dispatch);
			toast.success("Profile updated");
			
		} catch (err) {
			
		}
	};

	const deleteProfile = async () => {
		if (!password) return toast.error("Password required");
		try {
			localStorage.removeItem("token");
			toast.success("Profile deleted");
			window.location.href = "/";
		} catch {
			toast.error("Wrong password");
		}
	};

	return (
		<>
			{/* INLINE ANIMATION STYLES */}
			<style>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fadeIn {
					animation: fadeIn 0.5s ease-out;
				}
			`}</style>

			<div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
						Dashboard
					</h2>

					{/* TABS */}
					<div className="flex justify-center gap-6 mb-10">
						<button
							onClick={() => setActiveTab("profile")}
							className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
								${
									activeTab === "profile"
										? "bg-indigo-600 text-white shadow-lg scale-105"
										: "bg-white text-gray-700 hover:bg-gray-200"
								}`}>
							👤 Profile
						</button>

						<button
							onClick={() => setActiveTab("blogs")}
							className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300
								${
									activeTab === "blogs"
										? "bg-indigo-600 text-white shadow-lg scale-105"
										: "bg-white text-gray-700 hover:bg-gray-200"
								}`}>
							📝 My Blogs
						</button>
					</div>

					{/* PROFILE TAB */}
					{activeTab === "profile" && (
						<div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
							<h3 className="text-2xl font-bold mb-6 text-gray-800">
								Profile Details
							</h3>

							<div className="grid gap-5">
								<input
									className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
									placeholder="Name"
									value={profile.name || ""}
									onChange={(e) =>
										setProfile({ ...profile, name: e.target.value })
									}
								/>
								<input
									className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
									placeholder="Phone"
									value={profile.phone || ""}
									onChange={(e) =>
										setProfile({ ...profile, phone: e.target.value })
									}
								/>
								<input
									className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
									placeholder="College"
									value={profile.college || ""}
									onChange={(e) =>
										setProfile({ ...profile, college: e.target.value })
									}
								/>
								<input
									className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
									placeholder="About Me"
									value={profile.description || ""}
									onChange={(e) =>
										setProfile({
											...profile,
											description: e.target.value,
										})
									}
								/>
							</div>

							<button
								onClick={updateProfile}
								className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl
								           hover:bg-indigo-700 transition shadow-lg">
								Update Profile
							</button>

							{/* DELETE PROFILE */}
							<div className="mt-10 border border-red-300 rounded-xl p-6 bg-red-50">
								<h4 className="font-bold text-red-600 mb-3">Delete Profile</h4>
								<input
									type="password"
									placeholder="Confirm Password"
									className="border rounded-xl p-3 w-full mb-4"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									onClick={deleteProfile}
									className="bg-red-600 text-white px-6 py-3 rounded-xl w-full
									           hover:bg-red-700 transition shadow-md">
									Delete Profile
								</button>
							</div>
						</div>
					)}

					{/* BLOGS TAB */}
					{activeTab === "blogs" && (
						<div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
							<h3 className="text-2xl font-bold mb-6 text-gray-800">
								My Blogs
							</h3>

							{blogs.length > 0 ? (
								<div className="space-y-4">
									{blogs.map((blog) => (
										<div
											key={blog._id}
											className="flex justify-between items-center p-4 border rounded-xl
											           hover:shadow-md transition">
											<span className="font-medium text-gray-700">
												{blog.title}
											</span>
											<Link
												to={`/edit/${blog._id}`}
												className="text-indigo-600 font-semibold hover:underline">
												Edit
											</Link>
										</div>
									))}
								</div>
							) : (
								<p className="text-gray-500 text-lg">
									You haven’t written any blogs yet.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
