/** @format */

import axios from "axios";
const app = axios.create({});

export const Blog = async (method, url, bodyData, token) => {
	try {
		const respone = await app({
			method: method,
			url: url,
			data: bodyData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
    } catch(err) {
        console.log(err.message)
        return String(err);
	} finally {
	}
};

export const Auth = async (method, url, bodyData) => {
    try {
        
	} catch {
	} finally {
	}
};
