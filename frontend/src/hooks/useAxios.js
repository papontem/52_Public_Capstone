// useAxios.js
import { useState } from "react"; // remember to import use effect if planning to use the other components here
import axios from "axios";
import { v4 as uuid } from "uuid";

export default function useAxios(url, options = {}) {
	const [axiosRequestResponses, setAxiosRequestResponses] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const addData = async () => {
		try {
			setLoading(true);
			setError(null);
			//   const dateRequested = new Date();
			const response = await axios.get(url, options);

			// console.log("Response:", response);
			// console.log("Response Data:", response.data);

			setAxiosRequestResponses((prevRequestResponses) => [
				{
					...response.data,
					id: uuid(),
					// dateRequested: dateRequested
				},
				...prevRequestResponses,
			]);
		} catch (error) {
			setError(error);
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	// currently working out how to extract/manipulate the recieved data
	console.log("Axios Response Data Array:", axiosRequestResponses);

	/** Typical log response from a resquest asking for all type of fatcs for the day 24 of the month 12
	 * 
	 *  22:27:24.210 Axios Response Data Array:  
			V Array [ {…} ]
			​
				V 0: Object { selected: (19) […], births: (234) […], id: "f49e21de-3ddf-41fd-abfb-267b36ff4323", … }
				​​
					births: Array(234) [ {…}, {…}, {…}, … ]
					​​
					deaths: Array(124) [ {…}, {…}, {…}, … ]
					​​
					events: Array(61) [ {…}, {…}, {…}, … ]
					​​
					holidays: Array(10) [ {…}, {…}, {…}, … ]
					​​
					id: "f49e21de-3ddf-41fd-abfb-267b36ff4323"
					​​
					selected: Array(19) [ {…}, {…}, {…}, … ]
				​​
					<prototype>: Object { … }

			​	V 1: Object { selected: (19) […], id: "f6aa340f-e760-442c-b0a7-e2cc3418ed9f" }
​​
					id: "f6aa340f-e760-442c-b0a7-e2cc3418ed9f"
					​​
					selected: Array(19) [ {…}, {…}, {…}, … ]
					​​
					<prototype>: Object { … }
				​
			length: 2
			<prototype>: Array []
			useAxios.js:24
	 */
	return { axiosRequestResponses, loading, error, addData };
}


