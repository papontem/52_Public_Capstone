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

	return { axiosRequestResponses, loading, error, addData };
}


