/** @format */

import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
	const blog = await Blog.create({
		...req.body,
		author: req.user.id,
	});
	res.json(blog);
};

export const getBlogs = async (req, res) => {
	const { search } = req.query;
	const blogs = await Blog.find({
		title: { $regex: search || "", $options: "i" },
	}).populate("author", "name");

	res.json(blogs);
};

export const getMyBlogs = async (req, res) => {
	const blogs = await Blog.find({ author: req.user.id });
	res.json(blogs);
};

export const updateBlog = async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog.author.toString() !== req.user.id)
		return res.status(403).json({ message: "Forbidden" });

	Object.assign(blog, req.body);
	await blog.save();
	res.json(blog);
};

export const deleteBlog = async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog.author.toString() !== req.user.id)
		return res.status(403).json({ message: "Forbidden" });

	await blog.deleteOne();
	res.json({ message: "Blog deleted" });
};
