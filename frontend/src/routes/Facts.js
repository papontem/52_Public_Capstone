// Facts.js

// react essential components
import React, { useContext, useState } from "react";
import AppContext from "../AppContext";

import OnThisDay from "../OnThisDay.js";

import "./Facts.css";
export default function Facts(props) {
	const { appInfo, api, user, token, storedFacts, setStoredFacts } =
		useContext(AppContext);

	console.log(
		"Fatcs Component Context:",
		appInfo,
		api,
		user,
		token,
		"StoredFacts:",
		storedFacts
	);

	return (
		<div className="Facts">
			<h1>Facts!</h1>
			<p>This is the Facts Page</p>
			<p>
				With-in this page you will find the means to which we grab fatcs
				provided by the wikipedia feed api's on-this-day end point.
			</p>

            < OnThisDay />
		</div>
	);
}
