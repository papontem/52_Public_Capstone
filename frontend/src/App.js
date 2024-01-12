import "./App.css";
import NavBar from "./navbar/NavBar.js";
import Header from "./header/Header.js";
import Footer from "./footer/Footer.js";
import Home from "./main/routes/Home.js";
import SignIn from "./main/routes/SignIn.js";
import Favorites from "./main/routes/Favorites.js";
import Random from "./main/routes/Random.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContext from "./AppContext.js";
import { useState } from "react";
function App() {
	const [appString, setAppString] = useState("hello there!");
	return (
		<AppContext.Provider value={{ appString, setAppString }}>
			<div className="App">
				<BrowserRouter>
					<NavBar />
					<Header />
					<Routes>
						<Route path="/" element=<Home /> />
						<Route path="/signIn" element=<SignIn /> />
						<Route path="/favorites" element=<Favorites /> />
						<Route path="/random" element=<Random /> />
					</Routes>
				</BrowserRouter>

				<Footer />
			</div>
		</AppContext.Provider>
	);
}

export default App;
