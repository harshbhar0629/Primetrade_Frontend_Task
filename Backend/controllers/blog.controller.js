/** @format */

import Blog from "../models/BlogSchema.js";

export const createBlog = async (req, res) => {
	try {
		const { title, content } = req.body;
		const newBlog = await Blog.create({
			title, content,
			author: req.user.id,
		});
		const blog = await Blog.findById(newBlog._id).populate("author")
		return res
			.status(200)
			.json({ success: true, blog, message: "Blog created" });
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			success: false,
			data: String(err),
			message: "error in creation in blog",
		});
	}
};

export const getBlogs = async (req, res) => {
	try {
		console.log("inside get blog")
		const allBlogs = await Blog.find({}).populate("author");
		console.log(allBlogs);
		return res.status(200).json({success: true, Blogs: allBlogs, message: "blog fetched successfully"})
	}
	catch (err) {
		return res
			.status(400)
			.json({
				success: false,
				data: String(err),
				message: "Error in fetching the blogs",
			});
	}
};

export const getMyBlogs = async (req, res) => {
	const blogs = await Blog.find({ author: req.user.id });
	res.json(blogs);
};

export const updateBlog = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		if (blog.author.toString() !== req.user.id)
			return res.status(403).json({ message: "Forbidden" });

		const updatedBlog = await Blog.findByIdAndUpdate({_id: req.params.id}, { title: req.body?.title, content: req.body?.content }, {new: true}).populate("author");
		return res
			.status(200)
			.json({
				success: true,
				message: "Blog updated successfully",
				data: updatedBlog,
			});
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			success: false,
			data: String(err),
			message: "Error in updating the blog",
		});
	}
};

export const deleteBlog = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id);
		if (blog.author.toString() !== req.user.id)
			return res.status(403).json({ message: "Forbidden" });

		await blog.deleteOne();
		res.status(200).json({success:true, message: "Blog deleted" });
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({
			success: false,
			data: String(err),
			message: "Error in Deleting the blog",
		});
	}
	
};
