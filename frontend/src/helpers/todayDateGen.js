// todaysDateGen.js

function todayDateGen(params) {
	// console.log("Today's Date params:",params);
	const today = new Date();
	// console.log(today);
	// window.today = today;
	// we pad it to have it look like how the api request examples wants to represent single digit numbers with a 0 at the start.
	const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");
	const defaultDay = String(today.getDate()).padStart(2, "0");

    return {today, defaultMonth, defaultDay }
}

export default todayDateGen;
