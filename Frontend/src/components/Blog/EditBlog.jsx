/** @format */

import { useEffect, useState } from "react";
import {  BlogApi } from "../../Apis/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		// api.get(`/blogs/${id}`).then((res) => setBlog(res.data));
	}, [id]);

	const update = async () => {
		try {
			const res = await BlogApi("", "", "");
			toast.success("Blog updated");
			navigate("/dashboard");
		} catch {
			toast.error("Update failed");
		}
	};

	const del = async () => {
		if (!window.confirm("Are you sure you want to delete this blog?")) return;
		await api.delete(`/blogs/${id}`);
		toast.success("Blog deleted");
		navigate("/dashboard");
	};

	return (
		<div className="max-w-xl mx-auto mt-8">
			<input
				className="border p-2 w-full mb-3"
				value={blog.title || ""}
				onChange={(e) => setBlog({ ...blog, title: e.target.value })}
			/>
			<textarea
				className="border p-2 w-full mb-3 h-40"
				value={blog.content || ""}
				onChange={(e) => setBlog({ ...blog, content: e.target.value })}
			/>
			<div className="flex gap-3">
				<button
					onClick={update}
					className="bg-blue-600 text-white p-2 w-full">
					Update
				</button>
				<button
					onClick={del}
					className="bg-red-600 text-white p-2 w-full">
					Delete
				</button>
			</div>
		</div>
	);
};

export default EditBlog;
