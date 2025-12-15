/** @format */

import { useState } from "react";
import { BlogApi } from "../../Apis/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../../redux/slices/blogSlice";

const CreateBlog = () => {
	const [blog, setBlog] = useState({});
	const token = useSelector((state) => state?.auth?.token);
	const allBlogs = useSelector((state) => state?.blog?.blogsData);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		const id = toast.loading("loading..");
		try {
			const res = await BlogApi("post", "/", blog, token);
			const updatedBlogs = [res?.data?.blog, ...allBlogs]
			console.log(updatedBlogs)
			localStorage.setItem("blogsData", JSON.stringify(updatedBlogs));
			dispatch(setBlogsData(updatedBlogs));
			toast.dismiss(id);
			toast.success("Blog created successfully 🚀");
			navigate("/dashboard");
		} catch (err) {
			console.log(err.message)
			toast.dismiss(id)
			toast.error("Failed to create blog");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
			<div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-fadeIn">
				<h2 className="text-4xl font-extrabold text-center mb-2 text-gray-800">
					Create New Blog ✍️
				</h2>
				<p className="text-center text-gray-500 mb-8">
					Share your thoughts with the world
				</p>

				<form
					onSubmit={submit}
					className="space-y-6">
					{/* TITLE */}
					<div>
						<label className="block text-sm font-semibold text-gray-600 mb-1">
							Blog Title
						</label>
						<input
							type="text"
							placeholder="Enter blog title"
							className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
							onChange={(e) => setBlog({ ...blog, title: e.target.value })}
							required
						/>
					</div>

					{/* CONTENT */}
					<div>
						<label className="block text-sm font-semibold text-gray-600 mb-1">
							Blog Content
						</label>
						<textarea
							rows="6"
							placeholder="Write your blog content here..."
							className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
							onChange={(e) => setBlog({ ...blog, content: e.target.value })}
							required
						/>
					</div>

					{/* BUTTON */}
					<button
						disabled={loading}
						type="submit"
						className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
						Publish Blog 🚀
					</button>
				</form>
			</div>

			{/* Animation */}
			<style>
				{`
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
						animation: fadeIn 0.6s ease-out;
					}
				`}
			</style>
		</div>
	);
};

export default CreateBlog;
