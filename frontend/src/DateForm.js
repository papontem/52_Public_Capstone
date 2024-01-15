// DateForm.js

import React from "react";
import "./DateForm.css";


function DateForm({
	formData,
	handleDateChange,
	handleTypeChange,
	handleFetchData,
}) {
	console.log("DateForm component start");
	console.log("DateForm component end");
	return (
		<form className="OnThisDay-DateForm">
			<label className="OnThisDay-DateForm-Label">
				Month:
				<input
					className="OnThisDay-DateForm-Input"
					type="number"
					name="selectedMonth"
					min="1"
					max="12"
					value={formData.selectedMonth}
					onChange={handleDateChange}
				/>
			</label>
			<label className="OnThisDay-DateForm-Label">
				Day:
				<input
					className="OnThisDay-DateForm-Input"
					type="number"
					name="selectedDay"
					min="1"
					max="31"
					value={formData.selectedDay}
					onChange={handleDateChange}
				/>
			</label>

			<p> (1-12) MM - DD (1-31) </p>
			<p>
				{formData.selectedMonth.padStart(2, "0")} -{" "}
				{formData.selectedDay.padStart(2, "0")}
			</p>
			<label className="OnThisDay-DateForm-Label">
				Type:
				<select
					className="OnThisDay-DateForm-Select"
					value={formData.selectedType}
					onChange={handleTypeChange}>
					<option value="all">All</option>
					<option value="selected">Selected</option>
					<option value="events">Events</option>
					<option value="holidays">Holidays</option>
					<option value="births">Births</option>
					<option value="deaths">Deaths</option>
				</select>
			</label>
			<br />
			<br />
			<button
				className="OnThisDay-DateForm-FetchDataButton"
				onClick={handleFetchData}>
				Fetch Data!
			</button>
		</form>
	);
}

export default DateForm;
