// LogIn.js
// react essential components
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom"; // router V6
// style components
import "./LogIn.css";

export default function LogIn(props) {
	const { appInfo, api, user, login } = useContext(AppContext);
	const navigate = useNavigate(); // router V6

	const [loginFormData, setLoginFormData] = useState({
		username: "testuser",
		password: "password",
	});

	const handleLoginFormDataChange = (e) => {
		const { name, value } = e.target;
		setLoginFormData((previousLoginFormData) => ({
			...previousLoginFormData,
			[name]: value,
		}));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		// console debuggin cus im in a rush
		console.log(e);
		console.log("loginFormData:", loginFormData);

		// CALL API METHOD TO LOGIN
		login(loginFormData);

		navigate("/"); //ROUTER V6
	};

	useEffect(() => {
		console.log("login.js state:", {
			loginFormData,
		});
	}, [loginFormData]);
	return (
		<div className="LogIn">
			<h2>LogIn</h2>
			<p>THis iS tHE LogIn PAge</p>

			<form className="LogInForm" onSubmit={handleLoginSubmit}>
				<label htmlFor="username">
					Username:
					<input
						type="text"
						name="username"
						value={loginFormData.username}
						onChange={handleLoginFormDataChange}
						placeholder="Username"
						required
					/>
				</label>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						value={loginFormData.password}
						onChange={handleLoginFormDataChange}
						placeholder="Password"
						required
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
