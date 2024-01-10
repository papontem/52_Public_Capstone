// DataResults.js
import { v4 as uuid } from "uuid";
import "./DataResults.css";
/**
 * Function Componenet to display the facts text and year that have been passed to it after their fetch request.
 *
 *
 * @props {*} data array of objects
 * @Returns JSX rendering syntax for the display of info
 */
function DataResults({ data = {} }) {
	// todo filter and assign seperate arrays for the JSX to display for each category
	/* Progress:
	 * - [!] All
	 * 	- [/] Selected
	 * 	- [ ] Events
	 * 	- [ ] Holidays
	 * 	- [ ] Births
	 * 	- [ ] Deaths
	 */

	console.log("DataResults component start");
	console.log("Recieved data:", data);
	console.log("DataResults component end");

	// debuggin figuring out how to iterate through and map facts to jsx
	// if (data[0] !== undefined) {
	// 	console.log("DISPLAYING DATA!");
	// 	// console.log(data[0].selected);

	// 	for (let i = 0; i < data.length; i++) {

	// 		// if we pick selected as our first category
	// 		const selectedFacts = data[i].selected;
	// 		console.log("Selected Type:",selectedFacts);

	// 		// for (let j = 0; j < selectedFacts.length; j++) {
	// 		// 	const factObject = selectedFacts[j];

	// 		// 	console.log(`On This Day of the year ${factObject.year}: ${factObject.text}`);
	// 		// }
	// 	}
	// }

	return (
		<div className="OnThisDay-DataResults">
			<div className="OnThisDay-DataResults-selected">
				<button>&lt;- </button>
				<p>selected/curated slideshow</p>
				<button> -&gt;</button>
				<ul>
					{/* Render the facts from the API category: "selected" if they exist*/}
					{data &&
						data.selected &&
						data.selected.map((factObject, index) => (
							<li key={uuid()}>
								{factObject.year}: {factObject.text}
							</li>
						))}
				</ul>
			</div>
			<div className="OnThisDay-DataResults-events">
				<button>&lt;- </button>
				<p>more events slideshow</p>
				<button> -&gt;</button>
				<ul>
					{/* Render the facts from the API category: "events" if they exist*/}	{data &&
						data.events &&
						data.events.map((factObject, index) => (
							<li key={uuid()}>
								{factObject.year}: {factObject.text}
							</li>
						))}
				</ul>
			</div>
			<div className="OnThisDay-DataResults-holidays">
				<button>&lt;- </button>
				<p>holidays slideshow</p>
				<button> -&gt;</button>
				<ul>
					{/* Render the facts from the API category: "holidays" if they exist*/}	{data &&
						data.holidays &&
						data.holidays.map((factObject, index) => (
							<li key={uuid()}>
								{factObject.year}: {factObject.text}
							</li>
						))}
				</ul>
			</div>

			<div className="OnThisDay-DataResults-births">
				<button>&lt;- </button>
				<p>births slideshow</p>
				<button> -&gt;</button>
				<ul>
					{/* Render the facts from the API category: "births" if they exist*/}	{data &&
						data.births &&
						data.births.map((factObject, index) => (
							<li key={uuid()}>
								{factObject.year}: {factObject.text}
							</li>
						))}
				</ul>
			</div>
			<div className="OnThisDay-DataResults-deaths">
				<button>&lt;- </button>
				<p>deaths slideshow</p>
				<button> -&gt;</button>
				<ul>
					{/* Render the facts from the API category: "deaths" if they exist*/}	{data &&
						data.deaths &&
						data.deaths.map((factObject, index) => (
							<li key={uuid()}>
								{factObject.year}: {factObject.text}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default DataResults;

/**
 *
 *
 */
