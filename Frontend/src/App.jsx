/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedPages/ProtectedRoute";

import Home from "./components/Pages/Home"
import Login from "./components/Pages/Login";
import Signup from "./components/Pages/Signup";
import Dashboard from "./components/Pages/Dashboard";
import CreateBlog from "./components/Blog/CreateBlog";

function App() {
	
	return (
		<BrowserRouter>
			<Navbar />
			<Toaster />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>

				<Route
					path="/create"
					element={
						<ProtectedRoute>
							<CreateBlog />
						</ProtectedRoute>
					}
				/>
				{/* <Route
					path="/edit/:id"
					element={
						<ProtectedRoute>
							<EditBlog />
						</ProtectedRoute>
					}
				/> */}

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
