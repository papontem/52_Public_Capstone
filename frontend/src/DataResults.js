import React, { useContext } from "react";
import AppContext from "./AppContext";
import { v4 as uuid } from "uuid";
import "./DataResults.css";
import DataFactList from "./DataFactList";

function renderCategoryResults(category, categoryName, data) {
	return (
		<div key={uuid()} className={`OnThisDay-DataResults-${category}`}>
			<p>{`${categoryName} results:`}</p>
			{data && data[category] && <DataFactList facts={data[category]} />}
		</div>
	);
}

function DataResults({ data = {} }) {
	const { appInfo, setAppInfo, api } = useContext(AppContext);

	console.log("DataResults component start");
	console.log("Recieved data:", data);
	console.log("DataResults component end");

	return (
		<div className="OnThisDay-DataResults">
			{renderCategoryResults("selected", "Selected/Curated", data)}
			{renderCategoryResults("events", "More Events", data)}
			{renderCategoryResults("holidays", "Holidays", data)}
			{renderCategoryResults("births", "Births", data)}
			{renderCategoryResults("deaths", "Deaths", data)}
		</div>
	);
}

export default DataResults;
