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
import SignIn from "./routes/SignIn.js";
import Favorites from "./routes/Favorites.js";
import Random from "./routes/Random.js";
import OnThisDay from "./OnThisDay.js";

function App() {
	const api = OTD_TIL_Api;
	const [token, setToken] = useState(api.token);
	const [appInfo, setAppInfo] = useState();
	const [user, setUser] = useState(false);
	let localUser = JSON.parse(localStorage.getItem("user"));

	// const [isLoading, setIsLoading] = useState(false);
	// console.log("api:", OTD_TIL_Api);
	// console.log("api token:", OTD_TIL_Api.token);

	// put api token in local storage

	useEffect(() => {
		console.log("component mounting, retrieving possible local user info");

		console.log(
			"--------------------\n",
			"localStorage user:",
			JSON.parse(localStorage.getItem("user"))
		);
		// check local storage for user credentials
		if (!localUser) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			// attempt to log user in....

			// and pass their info down appContext
			setUser({ ...localUser });
		}
	}, []);
	// make a pre request to wiki foundation feed api server to touch it before making other taxing requests

	return (
		<AppContext.Provider
			value={{ appInfo, setAppInfo, api, token, setToken, user, setUser }}>
			<div className="App">
				<BrowserRouter>
					<NavBar />
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signIn" element={<SignIn />} />
						<Route path="/facts" element={<OnThisDay />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/random" element={<Random />} />
					</Routes>
				</BrowserRouter>

				<Footer />
			</div>
		</AppContext.Provider>
	);
}

export default App;
