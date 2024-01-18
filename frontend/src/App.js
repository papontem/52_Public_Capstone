// react prop, state, and context
import { useState, useEffect } from "react";
import AppContext from "./AppContext.js";

// our api for our db
import OTD_TIL_Api from "./OTD_TIL_Api.js";

// essential logic components for the wikiapi
import useAxios from "./hooks/useAxios.js";
import todayDateGen from "./helpers/todayDateGen.js";
import wikiApiSettings from "./helpers/wikiApiSettings.js";

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

export default function App() {
	const api = OTD_TIL_Api;
	// console.log("App.js OUR API:",api);
	const [appInfo, setAppInfo] = useState();
	const [isLoading, setIsLoading] = useState(false);

	let localToken = JSON.parse(localStorage.getItem("token")) || null;
	let localUser = JSON.parse(localStorage.getItem("user")) || null;

	const [token, setToken] = useState(localToken || api.token || null);
	const [user, setUser] = useState(
		localUser || {
			username: "",
			date_reg: "",
			email: "",
			isAdmin: false,
			favorites:[]
		}
	);
	// const [user, setUser] = useState({
	// 	username: "testuser",
	// 	date_reg: "2024-12-29",
	// 	email: "testuser@testuser.com",
	// 	isAdmin: false,
	// });

	const [storedFacts, setStoredFacts] = useState([]);
	const { today, defaultMonth, defaultDay } = todayDateGen();
	const { wikiBaseUrl, defaultType } = wikiApiSettings();
	// wiki_api Form Data State
	const [wikiApiFormData, setWikiApiFormData] = useState({
		url: wikiBaseUrl,
		selectedType: defaultType,
		selectedMonth: defaultMonth,
		selectedDay: defaultDay,
	});
	// Using the useAxios hook to use a custom axios request/response state logger,
	// and extracting here the states created there plus renaming a function to fetchData
	const {
		axiosRequestResponses,
		loading,
		error,
		addData: fetchData,
	} = useAxios(wikiApiFormData.url);

	// login - auth then get user
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

	// POST /pages { page } =>  { page }
	// pageDataObject should be { page_id, page_url, wikibase_item }
	async function addPageToDb(pageData) {
		console.log("App.js ADD PAGE TO DB", pageData);
		// setIsLoading(true);
		let pageDBObject;
		if (pageData.pageid && pageData.content_urls) {
			pageDBObject = {
				page_id: pageData.pageid,
				page_url: pageData.content_urls.desktop.page,
				wikibase_item: pageData.wikibase_item,
			};
		} else {
			pageDBObject = { ...pageData };
		}
		try {
			const res = await api.createAPage(pageDBObject);
			console.log("Page created successfully:", res);
		} catch (error) {
			console.error("Error creating page:", error);
		}
		// setIsLoading(false);
	}

	// POST facts/ { fact } => { fact }
	// factDataObject should be { text_title, fact_date, page_id }
	async function addFactToDb(factData) {
		console.log("App.js ADD FACT TO DB:", factData);
		// setIsLoading(true);
		const factDBObject = {
			text_title: factData.text,
			fact_date: `${factData.year}/${wikiApiFormData.selectedMonth}/${wikiApiFormData.selectedDay}`,
			page_id: factData.pages[0].pageid,
		};

		console.log("App.js ADD FACT TO DB FACTDBOBJECT:", factDBObject);
		try {
			// find out if page has already been created before fact inclusion, if not create the page
			console.log(
				"MAKING PARENT:",
				factData.pages[0].content_urls.desktop.page
			);
			const factParentPage = {
				page_id: factData.pages[0].pageid,
				page_url: factData.pages[0].content_urls.desktop.page,
				wikibase_item: factData.pages[0].wikibase_item,
			};

			try {
				console.log("PARENT PAGE OF FACT:", factParentPage);
				// check if page is already in our database, our db throws an error if its not, we want to then create the page if its not already existing
				const getPageRes = await api.getPage(factParentPage.page_id);
				console.log("App.js api.getPage() response: ", getPageRes);
			} catch (error) {
				console.log(error);
				if (error[0] === `No page: ${factParentPage.page_id}`) {
					console.log("YO DAWG LETS MAKE THE PAGE THEN!!!!");
					// create page if getPageRes is unsuccesfull
					await addPageToDb(factParentPage);
				}
			}

			const res = await api.createAFact(factDBObject);
			console.log("App.js RES:", res);
			return res;
		} catch (error) {
			console.error("Error creating fact:", error);
		}
		// setIsLoading(false);
	}

	// POST users/username/facts/factId
	async function addFactToFavorites(factObject) {
		console.log(
			"App.js Add Fact To Favorites fact object to find:",
			factObject
		);
		try {
			let factSearchResults = await api.getFactsBy(factObject.text);
			console.log("FACT SEARCH RESULT:", factSearchResults);

			let firstMatchingFact = factSearchResults[0];
			console.log("fact:", firstMatchingFact);
			if (firstMatchingFact.fact_id) {
				try {
					const res = await api.favoriteAFact(
						user.username,
						firstMatchingFact.fact_id
					);
					console.log("App.js favorite A Fact RES:", res);

					// now update user
					const { username } = user;
					const userRes = await api.getUser(username);
					// set the current user in state and local storage
					setUser({ ...userRes.user });
					// localStorage.setItem("user", JSON.stringify(userRes.user));

				} catch (error) {
					console.error("Error adding fact to favorites:", error);
				}
			}
		} catch (error) {
			console.error("Error finding fact to favorite:", error);
		}
	}

	// possible security bug
	// Call getUser after a delay using setTimeout
	// function delayedGetUser(username=user.username, delayMillis=5000) {
	// 	setTimeout(async () => {
	// 		try {
	// 			const user = await api.getUser(username);
	// 			console.log("User:", user);
	// 		} catch (error) {
	// 			console.error("Error getting user:", error);
	// 		}
	// 	}, delayMillis);
	// }

	// any time that our user and token states change we also set them in local storage
	useEffect(() => {
		// let localUser = JSON.parse(localStorage.getItem("user"));
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", JSON.stringify(token));
		api.token = token;
		// delayedGetUser()
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
				addFactToDb,
				addFactToFavorites,
				today,
				defaultMonth,
				defaultDay,
				wikiBaseUrl,
				defaultType,
				wikiApiFormData,
				setWikiApiFormData,
				axiosRequestResponses,
				loading,
				error,
				fetchData,
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
