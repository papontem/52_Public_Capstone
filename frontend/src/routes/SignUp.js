// SignIn.js

import "./SignUp.css";

export default function SignUp(props) {
	return (
		<div className="SignUp">
			<h2>Sign Up</h2>
			<p>THis iS tHE Sign Up PAge</p>
			{/* <form className="SignupForm" onSubmit={handleSignupSubmit}> */}
			<form className="SignupForm">
				<label htmlFor="username">
					Username:
					<input
						type="text"
						name="username"
						// value={signupFormData.username}
						// onChange={handleSignupFormDataChange}
						placeholder="Username"
						required
					/>
				</label>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						// value={signupFormData.password}
						// onChange={handleSignupFormDataChange}
						placeholder="Password"
						required
					/>
				</label>

				<label htmlFor="email">
					Email:
					<input
						type="email"
						name="email"
						// value={signupFormData.email}
						// onChange={handleSignupFormDataChange}
						placeholder="Email"
						required
					/>
				</label>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
