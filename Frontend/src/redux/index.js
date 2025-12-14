/** @format */

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import blogSlice from "./slices/blogSlice";

const rootReducer = combineReducers({
	auth: userReducer,
	blog: blogSlice
});

export default rootReducer;
