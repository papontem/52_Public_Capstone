// Home.js

// react essential components
import {
	useContext,
	// useState
} from "react";
import AppContext from "../AppContext";

import "./Home.css";

export default function Home(props) {
	const {
		user,
		// api,
		// appInfo,
	} = useContext(AppContext);

	// console.log("Home Component Context:", appInfo, api, user);
	return (
		<div className="Home">
			<h2>Home</h2>
			<p>This IS The homepage</p>
			<p>Welcome to the Today I learned: On This Day React App!</p>

			{user && user.username !== "" ? (
				<p>Welcome Back {user.username} !</p>
			) : (
				<></>
			)}
		</div>
	);
}
