/** @format */

import { useEffect, useState } from "react";

const Home = () => {
	const [blogs, setBlogs] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		
	}, []);

	return (
		<div className="p-6">
			<input
				className="border p-2 w-full mb-4"
				placeholder="Search blog by title..."
				onChange={(e) => setSearch(e.target.value)}
			/>

			{blogs && blogs.map((blog) => (
				<div
					key={blog._id}
					className="border p-4 mb-3 rounded">
					<h2 className="text-xl font-bold">{blog.title}</h2>
					<p>{blog.content}</p>
					<p className="text-sm text-gray-500">By {blog.author?.name}</p>
				</div>
			))}
		</div>
	);
};

export default Home;
