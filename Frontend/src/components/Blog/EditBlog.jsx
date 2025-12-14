/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BlogApi, UserApi } from "../../Apis/api";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../../redux/slices/blogSlice";

const EditBlog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const token = useSelector((state) => state?.auth?.token);
	const [loading, setloading] = useState(true);
	const dispatch = useDispatch();

	const allBlogs = useSelector((state) => state?.blog?.blogsData);
	const [currentData, setCurrData] = useState({});

	const [blog, setBlog] = useState({
		title: "",
		content: "",
	});

	useEffect(() => {
		if (allBlogs?.length) {
			const currentBlog = allBlogs.find(
				(blog) => String(blog._id) === String(id)
			);
			if (currentBlog) {
				setBlog({
					title: currentBlog?.title,
					content: currentBlog?.content,
				});
				setCurrData({
					title: currentBlog?.title,
					content: currentBlog?.content,
				});
			}
		}
	}, [id, allBlogs]);

	const updateBlog = async () => {
		if (
			currentData?.title.trim() === blog?.title.trim() &&
			currentData?.content?.trim() === blog?.content?.trim()
		) {
			return;
		}
		try {
			console.log("inside update blog");
			const res = await BlogApi("put", "/" + id, blog, token);
			// data data
			const updatedBlog = res?.data?.data;
			let blogsData = allBlogs;
			blogsData = blogsData.map((blog) =>
				String(blog?._id) === String(updatedBlog?._id) ? updatedBlog : blog
			);

			dispatch(setBlogsData(blogsData));
			localStorage.setItem("blogsData", null);
			localStorage.setItem("blogsData", JSON.stringify(blogsData));
			toast.success("Blog updated successfully");
			navigate("/dashboard");
		} catch {
			toast.error("Failed to update blog");
		}
	};

	return (
		<>
			{/* INLINE ANIMATION */}
			<style>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slideUp {
					animation: slideUp 0.6s ease-out;
				}
			`}</style>

			<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center px-4">
				<div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl animate-slideUp">
					<h2 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">
						✏️ Edit Your Blog
					</h2>

					<p className="text-center text-gray-500 mb-8">
						Update your content and keep it fresh
					</p>

					<div className="space-y-6">
						<input
							className="w-full border border-gray-300 p-4 rounded-xl text-lg
							           focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
							placeholder="Blog Title"
							value={blog.title}
							onChange={(e) => {
								setBlog({ ...blog, title: e.target.value });
								if (currentData.title !== e.target.value) {
									console.log("inside");
									setloading(false);
								}
							}}
						/>

						<textarea
							rows={8}
							className="w-full border border-gray-300 p-4 rounded-xl text-lg
							           focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
							placeholder="Write your blog content..."
							value={blog.content}
							onChange={(e) => {
								setBlog({ ...blog, content: e.target.value });
								if (currentData.content !== e.target.value) {
									console.log("inside");
									setloading(false);
								}
							}}
						/>
					</div>

					<div className="flex justify-between items-center mt-8">
						<button
							onClick={() => navigate(-1)}
							className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold
							           hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
							Back
						</button>

						<button
							onClick={updateBlog}
							disabled={loading}
							className="px-8 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold
							           hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
							Update Blog
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditBlog;
