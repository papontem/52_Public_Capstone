// react prop, state, and context
import React, { useState, useEffect } from "react";
import AppContext from "./AppContext.js";

// our api for our db
import OTD_TIL_Api from "./OTD_TIL_Api.js";

// always on components
import "./App.css";
import NavBar from "./NavBar.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// dependent on url route components
import Home from "./routes/Home.js";
import SignUp from "./routes/SignUp.js";
import LogIn from "./routes/LogIn.js";
// import OnThisDay from "./OnThisDay.js";

// TODO
import Facts from "./routes/Facts.js";
import Favorites from "./routes/Favorites.js";
import Random from "./routes/Random.js";

function App() {
	const api = OTD_TIL_Api;
	console.log(api);
	const [appInfo, setAppInfo] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [token, setToken] = useState(api.token);
	const [user, setUser] = useState({
		username: "",
		date_reg: "",
		email: "",
		isAdmin: false,
	});
	// const [user, setUser] = useState({
	// 	username: "testuser",
	// 	date_reg: "2024-12-29",
	// 	email: "testuser@testuser.com",
	// 	isAdmin: false,
	// });

	const [storedFacts, setStoredFacts] = useState([]);

	// login - get user
	async function login(loginFormData) {
		setIsLoading(true); // Set isLoading to true before making changes
		const res = await api.authUser(loginFormData);
		if (res.token) {
			const { username } = loginFormData;
			const userRes = await api.getUser(username);
			// set the current user in state and local storage
			setUser({ ...userRes.user });
			// localStorage.setItem("user", JSON.stringify(userRes.user));

			setToken(res.token);
			// localStorage.setItem("token", JSON.stringify(res.token));
		}
		setIsLoading(false);
	}

	// signup - register user
	async function signup(signupFormData) {
		setIsLoading(true); // Set isLoading to true before making changes
		const res = await api.registerUser(signupFormData);
		if (res.token) {
			const { username } = signupFormData;
			const userRes = await api.getUser(username);
			setUser({ ...userRes.user });
			// localStorage.setItem("user", JSON.stringify(userRes.user));

			setToken(res.token);
			// localStorage.setItem("token", JSON.stringify(res.token));
		}
		setIsLoading(false);
	}

	// logout user
	function logout() {
		setIsLoading(true);
		// ERASE THE EVIDENCE
		setUser({
			username: "",
			date_reg: "",
			email: "",
			isAdmin: false,
		});
		setToken("");
		setIsLoading(false);
	}

	async function addPageToDb(pageData) {
		setIsLoading(true);
		try {
			const res = await api.createAPage(pageData);
			console.log("Page created successfully:", res);
		} catch (error) {
			console.error("Error creating page:", error);
		}
		setIsLoading(false);
	}

	async function addFactToDb(factData) {
		setIsLoading(true);
		try {
			const res = await api.createAFact(factData);
			console.log("Fact created successfully:", res);
		} catch (error) {
			console.error("Error creating fact:", error);
		}
		setIsLoading(false);
	}

	// any time that our user and token states change we also set them in local storage
	useEffect(() => {
		// let localUser = JSON.parse(localStorage.getItem("user"));
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", JSON.stringify(token));
		api.token = token;
	}, [user, token, api]);

	return (
		<AppContext.Provider
			value={{
				appInfo,
				setAppInfo,
				api,
				token,
				setToken,
				user,
				setUser,
				storedFacts,
				setStoredFacts,
				login,
				signup,
				logout,
				addPageToDb,
				addFactToDb
			}}>
			<div className="App">
				<BrowserRouter>
					<NavBar />
					<Header />
					{isLoading ? (
						<p>Loading ..... </p>
					) : (
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/logIn" element={<LogIn />} />
							<Route path="/signUp" element={<SignUp />} />
							<Route path="/facts" element={<Facts />} />
							{/* <Route path="/facts" element={<OnThisDay />} /> */}
							<Route path="/favorites" element={<Favorites />} />
							<Route path="/random" element={<Random />} />
						</Routes>
					)}
				</BrowserRouter>

				<Footer />
			</div>
		</AppContext.Provider>
	);
}

export default App;
