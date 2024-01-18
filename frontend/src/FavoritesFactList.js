// FavoritesFactList.js

import FavoritesFact from "./FavoritesFact";
import { v4 as uuid } from "uuid";

import "./FavoritesFactList.css";

export default function FavoritesFactList({ facts }) {
	return (
		<ul className="FavoritesFactList">
			{facts.map((factObject) => (
				<FavoritesFact key={factObject.fact_id} factObject={factObject} />
			))}
		</ul>
	);
}
