// SignIn.js

import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import { useNavigate } from "react-router-dom"; // router V6

import "./SignUp.css";

export default function SignUp(props) {
	const {
		// appInfo,
		//  api,
		//  user,
		signup,
	} = useContext(AppContext);

	const navigate = useNavigate(); // router V6
	const [signUpFormData, setSignUpFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const handleSignUpFormDataChange = (e) => {
		const { name, value } = e.target;
		setSignUpFormData((previoussignUpFormData) => ({
			...previoussignUpFormData,
			[name]: value,
		}));
	};

	const handleSignUpSubmit = (e) => {
		e.preventDefault();
		// console debuggin cus im in a rush
		console.log(e);
		console.log("signUpFormData:", signUpFormData);
		// CALL API METHOD TO REGISTER
		signup(signUpFormData);
		navigate("/"); // router V6
	};

	useEffect(() => {
		console.log("SignUp.js state:", {
			signUpFormData,
		});
	}, [signUpFormData]);

	return (
		<div className="SignUp">
			<h2>Sign Up</h2>
			<p>THis iS tHE Sign Up PAge</p>
			<form className="SignUpForm" onSubmit={handleSignUpSubmit}>
				<label htmlFor="username">
					Username:
					<input
						type="text"
						name="username"
						value={signUpFormData.username}
						onChange={handleSignUpFormDataChange}
						placeholder="Username"
						required
					/>
				</label>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						value={signUpFormData.password}
						onChange={handleSignUpFormDataChange}
						placeholder="Password"
						required
					/>
				</label>

				<label htmlFor="email">
					Email:
					<input
						type="email"
						name="email"
						value={signUpFormData.email}
						onChange={handleSignUpFormDataChange}
						placeholder="Email"
						required
					/>
				</label>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
