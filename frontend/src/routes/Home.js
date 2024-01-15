// Home.js

// react essential components
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";

import "./Home.css";

export default function Home(props) {
	const { appInfo, api, user } = useContext(AppContext);

	console.log("Home Component Context:", appInfo, api, user);
	return (
		<div className="Home">
			<h2>Home</h2>
			<p>This IS The homepage</p>
			<p>Welcome to the Today I learned: On This Day React App!</p>

			{!user ? (
				<p>
					You may Log in to start favoriting facts and pages, within just this
					web app ... or jump right in and run querys on wikipedia's onthisday
					api endpoint.
				</p>
			) : (
				<p>Welcome Back {user.username} !</p>
			)}
			
		</div>
	);
}
