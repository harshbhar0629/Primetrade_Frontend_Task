/** @format */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BlogApi, UserApi, UserApiDelete } from "../../Apis/api";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../../redux/slices/blogSlice";

const Dashboard = () => {
	const userData = useSelector((state) => state?.auth?.userData);
	const allBlogs = useSelector((state) => state?.blog?.blogsData);
	const [loading, setLoading] = useState(false);

	const [profile, setProfile] = useState({
		name: "",
		college: "",
		phone: "",
		description: "",
	});
	const [blogs, setBlogs] = useState([]);
	const [password, setPassword] = useState("");
	const [activeTab, setActiveTab] = useState("");
	const [expandedBlog, setExpandedBlog] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector((state) => state?.auth?.token);
	const navigate = useNavigate();

	const updateProfile = async () => {
		const id = toast.loading("loading..");
		try {
			setLoading(true);
			const res = await UserApi("put", "/update", profile, dispatch, token);
			toast.dismiss(id);
			setLoading(false);
			toast.success("Profile updated successfully");
		} catch (err) {
			toast.dismiss(id);
			toast.error("Error updating profile");
		}
	};

	const deleteProfile = async () => {
		const id = toast.loading("loading..");
		try {
			if (!password) return toast.error("Password required");
			setLoading(true);
			const res = await UserApiDelete(
				"post",
				"/delete",
				{ password: password },
				token
			);
			setLoading(false);
			toast.dismiss(id);
			navigate("/");
			toast.success("Profile deleted");
		} catch (err) {
			console.log(err.message);
			toast.dismiss(id);
			toast.error("Error in deleting the profile");
		}
	};

	const deleteBlog = async (id) => {
		const ids = toast.loading("loading..");
		try {
			setLoading(true)
			await BlogApi("delete", `/blog/${id}`, {}, token);
			setLoading(false);
			const updatedBlog = allBlogs.filter((b) => String(b._id) !== String(id));
			localStorage.setItem("blogsData", JSON.stringify(updatedBlog));
			dispatch(setBlogsData(updatedBlog));
			setBlogs(blogs.filter((b) => b._id !== id));
			toast.dismiss(id);
			toast.success("Blog deleted");
		} catch (err) {
			console.log(err.message);
			toast.dismiss(id);
			toast.error("Failed to delete blog");
		}
	};

	useEffect(() => {
		setProfile({
			name: userData?.name,
			college: userData?.college,
			phone: userData?.phone,
			description: userData?.description,
		});
		console.log("all blog");

		console.log(
			allBlogs?.filter((blog) => blog?.author?._id === userData?._id)
		);
		setBlogs(allBlogs?.filter((blog) => blog?.author?._id === userData?._id));
	}, [userData, allBlogs]);

	useEffect(() => {
		setActiveTab("profile");
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
					User Dashboard
				</h2>

				<div className="flex justify-center gap-6 mb-10">
					<button
						onClick={() => setActiveTab("profile")}
						className={`px-6 py-3 rounded-xl font-semibold transition-all ${
							activeTab === "profile" ? "bg-indigo-600 text-white" : "bg-white"
						}`}>
						👤 Profile
					</button>
					<button
						onClick={() => setActiveTab("blogs")}
						className={`px-6 py-3 rounded-xl font-semibold transition-all ${
							activeTab === "blogs" ? "bg-indigo-600 text-white" : "bg-white"
						}`}>
						📝 My Blogs
					</button>
				</div>

				{activeTab === "profile" && (
					<div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
						{" "}
						<h3 className="text-2xl font-bold mb-6 text-gray-800">
							{" "}
							Profile Details{" "}
						</h3>{" "}
						<div className="grid gap-5">
							{" "}
							<input
								className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
								placeholder="Name"
								value={profile.name || ""}
								onChange={(e) =>
									setProfile({ ...profile, name: e.target.value })
								}
							/>{" "}
							<input
								className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
								placeholder="Phone"
								type="tel"
								value={profile.phone || ""}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, "");
									setProfile({ ...profile, phone: value });
								}}
							/>{" "}
							<input
								className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
								placeholder="College"
								value={profile.college || ""}
								onChange={(e) =>
									setProfile({ ...profile, college: e.target.value })
								}
							/>{" "}
							<input
								className="border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500"
								placeholder="About Me"
								value={profile.description || ""}
								onChange={(e) =>
									setProfile({ ...profile, description: e.target.value })
								}
							/>{" "}
						</div>{" "}
						<button
							disabled={loading}
							onClick={updateProfile}
							className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg">
							{" "}
							Update Profile{" "}
						</button>{" "}
						{/* DELETE PROFILE */}{" "}
						<div className="mt-10 border border-red-300 rounded-xl p-6 bg-red-50">
							{" "}
							<h4 className="font-bold text-red-600 mb-3">
								Delete Profile
							</h4>{" "}
							<input
								type="password"
								placeholder="Confirm Password"
								className="border rounded-xl p-3 w-full mb-4"
								onChange={(e) => setPassword(e.target.value)}
							/>{" "}
							<button
								disabled={loading}
								onClick={deleteProfile}
								className="bg-red-600 text-white px-6 py-3 rounded-xl w-full hover:bg-red-700 transition shadow-md">
								{" "}
								Delete Profile{" "}
							</button>{" "}
						</div>{" "}
					</div>
				)}

				{activeTab === "blogs" && (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						{blogs?.length ? (
							blogs.map((blog) => (
								<div
									key={blog._id}
									className="border rounded-xl p-5 mb-5">
									<div className="flex justify-between items-center">
										<h4 className="text-xl font-bold">{blog.title}</h4>
										<div className="flex gap-4">
											<button
												onClick={() =>
													setExpandedBlog(
														expandedBlog === blog._id ? null : blog._id
													)
												}
												className="text-green-600 font-semibold">
												View
											</button>
											<Link
												to={`/edit/${blog._id}`}
												className="text-indigo-600 font-semibold">
												Edit
											</Link>
											<button
												disabled={loading}
												onClick={() => deleteBlog(blog._id)}
												className="text-red-600 font-semibold">
												Delete
											</button>
										</div>
									</div>

									{expandedBlog === blog._id && (
										<p className="mt-4 text-gray-700 leading-relaxed">
											{blog.content}
										</p>
									)}
								</div>
							))
						) : (
							<p className="text-gray-500">No blogs created yet.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
