/** @format */

import { useEffect, useState, useCallback } from "react";
import { BlogApi } from "../../Apis/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../../redux/slices/blogSlice";

const Home = () => {
	const allBlogs = useSelector((state) => state?.blog?.blogsData);
	const [blogs, setBlogs] = useState(allBlogs || []);
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const v = useSelector((state) => state.blog);
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	console.log(v);

	const getAllBlogs = useCallback(async () => {
		const id = toast.loading("loading..");
		try {
			const res = await BlogApi("get", "/", {}, "");
			dispatch(setBlogsData(res?.data?.Blogs));
			localStorage.setItem("blogsData", JSON.stringify(res?.data?.Blogs));
			toast.dismiss(id);

			toast.success(res?.data?.message);
			console.log("xcvbn");
			console.log(res?.data?.Blogs);
			setBlogs(res?.data?.Blogs);
		} catch (err) {
			console.log(err.message);
			toast.dismiss(id);
		}
	}, []);

	useEffect(() => {
		const setBlog = () => {
			if (blogs?.length <= 0) return;
			setFilteredBlogs(
				search.trim() === ""
					? blogs
					: blogs.filter((blog) =>
							blog.title?.toLowerCase().includes(search.toLowerCase())
					  )
			);
		};
		setBlog();
	}, [blogs, search]);

	useEffect(() => {
		if (blogs?.length === 0) {
			getAllBlogs();
		}
	}, [getAllBlogs]);

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="max-w-6xl mx-auto px-4">
				<h3 className="text-center font-extrabold text-5xl mb-8 text-gray-800">
					All Blogs
				</h3>

				<input
					className="border border-gray-300 rounded-xl p-3 w-full mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					placeholder="🔍 Search blog by title..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
					{filteredBlogs?.length > 0 ? (
						filteredBlogs.map((blog) => (
							<div
								key={blog._id}
								className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
								<h2 className="text-2xl font-bold text-gray-800 mb-3">
									{blog.title}
								</h2>

								<p className="text-gray-600 mb-4 line-clamp-4">
									{blog.content}
								</p>

								<div className="flex justify-between items-center text-lg text-gray-500">
									<span>✍️ {blog.author?.name || "Anonymous"}</span>
								</div>
							</div>
						))
					) : (
						<p className="col-span-full text-center text-gray-500 text-xl">
							No blogs found "{search}"
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
