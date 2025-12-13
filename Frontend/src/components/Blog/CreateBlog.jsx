/** @format */

import { useState } from "react";
import { Blog } from "../../Apis/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
	const [blog, setBlog] = useState({});
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		try {
			const res = await Blog("", "", "");
			toast.success("Blog created");
			navigate("/");
		} catch {
			toast.error("Failed to create blog");
		}
	};

	return (
		<form
			onSubmit={submit}
			className="max-w-xl mx-auto mt-8">
			<input
				className="border p-2 w-full mb-3"
				placeholder="Blog Title"
				onChange={(e) => setBlog({ ...blog, title: e.target.value })}
			/>
			<textarea
				className="border p-2 w-full mb-3 h-40"
				placeholder="Blog Content"
				onChange={(e) => setBlog({ ...blog, content: e.target.value })}
			/>
			<button className="bg-green-600 text-white p-2 w-full">
				Publish Blog
			</button>
		</form>
	);
};

export default CreateBlog;