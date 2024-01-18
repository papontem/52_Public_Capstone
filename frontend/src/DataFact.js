// DataFact.js
// react essential components
import { useContext } from "react";
import AppContext from "./AppContext";
// import { v4 as uuid } from "uuid";

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

	// TODO work out a way to deactivate the add to db and favorite buttons if fact is already in our db.
	return (
		<li className="DataFact" key={factObject.id}>
			{`${factObject.year}: ${factObject.text}`}
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
