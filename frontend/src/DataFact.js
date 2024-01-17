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



	// add pages from facts sources, if they arent already added, to the db.

	// add fact to db

	const handleFormSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<li className="DataFact" key={uuid()}>
			{`${factObject.year}: ${factObject.text}`}
			{token && user.username !== "" && (
				<form onSubmit={handleFormSubmit}>
					<button> add to db </button>
					<button> favorite </button>
				</form>
			)}
		</li>
	);
}

export default DataFact;
