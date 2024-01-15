// OnThisDay.js
// react essential components
import React, { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "./AppContext";

// essential logic components
import useAxios from "./hooks/useAxios.js";
import todayDateGen from "./helpers/todayDateGen.js";
import apiSettings from "./helpers/apiSettings.js";

// child components
import DateForm from "./DateForm.js";
import DataResults from "./DataResults.js";

// import axios from "axios"; //debugging

// style components
import "./OnThisDay.css";

function OnThisDay(props) {

	console.log("OnThisDay Main component start");
	const { today, defaultMonth, defaultDay } = todayDateGen();
	const { baseUrl, defaultType } = apiSettings();

	// const todayString = today.toDateString();
	// console.log(todayString);

	// console.log(
	// 	`|Today Is: ${defaultMonth}/${defaultDay}/${today.getFullYear()}`
	// );
	// console.log(`|Api baseUrl: ${baseUrl}\n|DefaultType: ${defaultType}`);

	// Form Data State
	const [formData, setFormData] = useState({
		url: baseUrl,
		selectedType: defaultType,
		selectedMonth: defaultMonth,
		selectedDay: defaultDay,
	});

	// end point OTD api request url updating function
	const updateUrl = useCallback(() => {
		// updating formData.url
		setFormData((prevData) => ({
			...prevData,
			url: `${baseUrl}/${prevData.selectedType}/${prevData.selectedMonth}/${prevData.selectedDay}`,
		}));
	}, [baseUrl]);

	// event handling function to change state of month and day number inputs
	const handleDateChange = (event) => {
		const { name, value } = event.target;
		console.log("DATE CHANGED!");
		setFormData((prevData) => ({
			...prevData,
			[name]: value.padStart(2, "0"),
		}));
		// Update URL when date changes
		updateUrl();
	};

	// event handling function to change state of historical fact type input
	const handleTypeChange = (event) => {
		setFormData((prevData) => ({
			...prevData,
			selectedType: event.target.value,
		}));
		console.log("TYPE CHANGED!");

		// Update URL when type changes
		updateUrl();
	};

	// Using the useAxios hook to use a custom axios request/response state logger,
	// and extracting here the states created there plus renaming a function to fetchData
	const {
		axiosRequestResponses,
		loading,
		error,
		addData: fetchData,
	} = useAxios(formData.url);

	// !!!!! TODO: CRATE A STATE THAT WE CAN HAVE EXIST IN LOCAL STORAGE FOR THE MOST RECENT REQUEST.
	// it should be an object with keys for selected, events, holidays, births, and deaths

	// State for the most recently fetched axios request
	const [recentRequest, setRecentRequest] = useState({
		selected: [],
		events: [],
		holidays: [],
		births: [],
		deaths: [],
		id: "",
	});

	// Have react execute function fetchData when fetchData Button is pressed
	const handleFetchData = async (e) => {
		e.preventDefault();
		console.log(
			`Fetching data for Current Selection (mm/dd): ${formData.selectedType} (${formData.selectedMonth}-${formData.selectedDay})`
		);

		console.log("Sending Request to:", formData.url);

		// Call the addData function from the useAxios hook
		await fetchData();
	};

	// use effect that occurs when form values are changed, im making doubly sure that state changes are being handled and that were not laggin behind
	useEffect(() => {
		updateUrl();
		// console.log(
		// 	`Updated Current Selection (mm-dd): ${formData.selectedType} (${formData.selectedMonth}-${formData.selectedDay})`
		// );
	}, [
		formData.selectedMonth,
		formData.selectedDay,
		formData.selectedType,
		updateUrl,
	]);

	// use effect that occurs when request response aray elements are recieved from axios
	useEffect(() => {
		// PAM:  now manipulate data to update the most recent request state, extract the historical fatcs for each available type recieved, and populate their array with the data for fact title, month day year, and at least one page link.

		if (axiosRequestResponses && axiosRequestResponses[0]) {
			setRecentRequest({
				selected: axiosRequestResponses[0].selected || [],
				events: axiosRequestResponses[0].events || [],
				holidays: axiosRequestResponses[0].holidays || [],
				births: axiosRequestResponses[0].births || [],
				deaths: axiosRequestResponses[0].deaths || [],
				id: axiosRequestResponses[0].id || "",
			});
		}
	}, [axiosRequestResponses]);

	console.log("OnThisDay Main component end");

	// // Render loading state
	// if (loading) {
	// 	return <p>Loading...</p>;
	// }

	// // Render error state
	// if (error) {
	// 	return <p>Error: {error.message}</p>;
	// }

	return (
		<div className="OnThisDay">
			<h2>Select A Day:</h2>
			{/* <p>
				Here is a form that you can interact with and fill with the data
				requiered for having the app make requests.
				</p>
				<p>
				You may select the month, day, and type of the historical facts you
				would like to be presented from the On This Day Endpoint of WikiMedia's
				Feed Api.
			</p>
			<p>
				NOTE: if you select to request all data, be prepared for either a long
				wait time or an error apearing in your console. Sometimes the requests
				to the API can break if your requesting a large amount of data depending
				on the day. THERE IS A LOT!!
			</p> */}

			<DateForm
				formData={formData}
				handleDateChange={handleDateChange}
				handleTypeChange={handleTypeChange}
				handleFetchData={handleFetchData}
			/>
			<hr />
			{/* conditionally render based on loading and error states */}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{!loading && !error && <DataResults data={recentRequest} />}
		</div>
	);
}

export default OnThisDay;