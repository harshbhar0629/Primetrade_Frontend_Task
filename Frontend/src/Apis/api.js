/** @format */

import axios from "axios";
import { setToken, setUserData } from "../redux/slices/userSlices";
const app = axios.create({});
const backUrl = "http://localhost:5000/api";

export const BlogApi = async (method, url, bodyData, token) => {
	try {
		const respone = await app({
			method: method,
			url: backUrl + `/blogs${url}`,
			data: bodyData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return respone;
	} catch (err) {
		console.log(err.message);
		return String(err);
	} finally {
		console.log("finally!");
	}
};

export const AuthApi = async (method, url, bodyData, dispatch) => {
	try {
		const response = await app({
			method: method,
			url: backUrl + `/auth${url}`,
			data: bodyData,
		});
		localStorage.setItem("token", JSON.stringify(response?.data?.token));
		dispatch(setUserData(response?.data?.userObj));
		
		dispatch(setToken(JSON.stringify(response?.data?.token)));
		console.log(response);
		return response;
	} catch {
		console.log(err.message);
		return String(err);
	} finally {
		console.log("finally!");
	}
};

export const UserApi = async (method, url, bodyData, dispatch) => {
	try {
		const response = await app({
			method: method,
			url: backUrl + `/users${url}`,
			data: bodyData,
		});
		localStorage.setItem("token", JSON.stringify(response?.data?.token));
		dispatch(setUserData(response?.data?.userObj));
		dispatch(setToken(JSON.stringify(response?.data?.token)));
		console.log(response);
		return response;
	} catch {
		console.log(err.message);
		return String(err);
	} finally {
		console.log("finally!");
	}
};
