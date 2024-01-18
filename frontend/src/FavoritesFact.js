export default function FavoritesFact(factObject) {
	console.log("Favorite Fact:", factObject);
	const fact = { ...factObject.factObject };

	const dateString = fact.fact_date;
	const originalDate = new Date(dateString);

	const year = originalDate.getFullYear();
	// Adding 1 because months are zero-based
	const month = String(originalDate.getMonth() + 1).padStart(2, "0");
	const day = String(originalDate.getDate()).padStart(2, "0");

	const formattedDate = `${year}/${month}/${day}`;
	fact.fact_date = formattedDate;


	return (
		<li className="FavoritesFactList-FavoritesFact">
			<p>
				Fact Text Title: {fact.text_title}
				<br />
				Fact Id:{fact.fact_id}
				<br />
				Fact Date: {fact.fact_date}
			</p>
            
		</li>
	);
}
