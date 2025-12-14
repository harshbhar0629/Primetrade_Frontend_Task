/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	blogsData: null,
};

const blogSlice = createSlice({
	name: "blog",
	initialState: initialState,
	reducers: {
		setBlogsData(state, value) {
			state.blogsData = value.payload;
		},
	},
});

export const { setBlogsData } = blogSlice.actions;
export default blogSlice.reducer;
