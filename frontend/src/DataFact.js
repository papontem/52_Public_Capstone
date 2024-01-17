// DataFact.js
// react essential components
import React, { useContext } from "react";
import AppContext from "./AppContext";
import { v4 as uuid } from "uuid";

function DataFact({ factObject }) {
	console.log("DATAFACT:", factObject);
	const { appInfo, api, user, token, addPageToDb, addFactToDb } =
		useContext(AppContext);
	// console.log("DATAFACT context:".api, user, token, addFactToDb, addPageToDb);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// logic to handle adding the fact to the database
		addFactToDb(factObject);
	};

	return (
		<li className="DataFact" key={factObject.id}>
			{`${factObject.year}: ${factObject.text}`}
			{token && user.username !== "" && (
				<form onSubmit={handleFormSubmit}>
					<button type="submit">Add fact to DB</button>
					<button>Favorite</button>
				</form>
			)}
		</li>
	);
}

export default DataFact;
