// DataFactList.js
import React from "react";
import DataFact from "./DataFact";
import { v4 as uuid } from "uuid";

function DataFactList({ facts }) {
	return (
		<ul className="DataFactList">
			{facts.map((factObject) => (
				<DataFact key={uuid()} factObject={factObject} />
			))}
		</ul>
	);
}

export default DataFactList;
