// DataFact.js
// react essential components
import { useContext } from "react";
import AppContext from "./AppContext";
// import { v4 as uuid } from "uuid";

import "./DataFact.css";

function DataFact({ factObject }) {
	// console.log("DataFact.js :", factObject);
	const {
		// appInfo,
		// api,
		user,
		token,
		// addPageToDb,
		addFactToDb,
		addFactToFavorites,
	} = useContext(AppContext);
	// console.log("DATAFACT context:".api, user, token, addFactToDb, addPageToDb, addFactToFavorites);

	const handleFormSubmit = (e) => {
		console.log("DataFact.js  ADD FACT:", factObject);
		e.preventDefault();
		// logic to handle adding the fact to the database
		addFactToDb(factObject);
	};
	const handleFavoriteFormSubmit = (e) => {
		console.log("DataFact.js FAVORITE FACT:", factObject);
		e.preventDefault();
		// logic to handle adding the fact to the database
		addFactToFavorites(factObject);
	};

	// console.log("factObject.pages[0].content_url.desktop.page", factObject.pages[0].content_url.desktop.page);
	// TODO work out a way to deactivate the add to db and favorite buttons if fact is already in our db.
	return (
		<li className="DataFact" key={factObject.id}>
			<p>{`${factObject.year}: ${factObject.text}`}</p>
			<a href={factObject.pages[0].content_urls.desktop.page}> &gt; Wiki &lt; </a>
			{token && user.username !== "" && (
				<>
					<form onSubmit={handleFormSubmit}>
						<button type="submit">Add fact to DB</button>
					</form>
					<form onSubmit={handleFavoriteFormSubmit}>
						<button type="submit">Favorite</button>
					</form>
				</>
			)}
		</li>
	);
}

export default DataFact;
