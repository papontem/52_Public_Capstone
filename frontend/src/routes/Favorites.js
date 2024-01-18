// Favorites.js

// react essential components
import { useContext } from "react";
import AppContext from "../AppContext";
import FavoritesFactList from "../FavoritesFactList";

import "./Favorites.css";

export default function Favorites(props) {
	const {
		// appInfo,
		// api,
		user,
		token,
		// storedFacts,
		// setStoredFacts
	} = useContext(AppContext);
	console.log("Favorites.js app context:", user, token);

	console.log("User Favorites:", user.favorites);
	return (
		<div className="Favorites">
			<h2>Favorites</h2>
			<p>THis iS tHE Favorites PAge</p>
			<FavoritesFactList facts={user.favorites} />
		</div>
	);
}
