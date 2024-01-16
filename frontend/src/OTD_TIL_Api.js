// OTD_TIL_Api.js

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class OTD_TIL_Api {
	// the token for interactive with the API will be stored here.
	static token;

	/**
	 *
	 * @param {*} endpoint - url string route that user wants to request our api for data from/to
	 * @param {*} data - json parsable object that user can send in with their request. defaults to empty obj {}
	 * @param {*} method - api axios methods to be used depending on request, defaults to "get"
	 * @returns
	 */
	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${OTD_TIL_Api.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Multiple Resource API routes -+-+-+-+-+-+-+-+->

	/** Get all data from pages table */
	static async getPages() {
		let res = await this.request(`pages`);
		// console.log("RES:", res);
		return res.pages;
	}

	/** Get all data from facts table */
	static async getFacts() {
		let res = await this.request(`facts`);
		// console.log("RES:", res);
		return res.facts;
	}

	/** Get data from pages table that have a name similar to search term */
	static async getPagesBy(searchTerm) {
		let res = await this.request(`pages?name=${searchTerm}`);
		// console.log("RES:", res);
		return res.pages;
	}

	/** Get data from facts table that have a title similar to search term */
	static async getFactsBy(searchTerm) {
		let res = await this.request(`facts?title=${searchTerm}`);
		// console.log("RES:", res);

		return res.facts;
	}

	// Individual API routes --------+-+-+-+-+-+-+-+->

	/** Get details on a page by page_id. */
	static async getPage(page_id) {
		let res = await this.request(`pages/${page_id}`);
		// console.log("RES:", res);
		return res.page;
	}

	/** Get details on a fact by fact_id. */
	static async getFact(fact_id) {
		let res = await this.request(`facts/${fact_id}`);
		// console.log("RES:", res);
		return res.fact;
	}

	/** Post a user thats trying to login
	 *
	 * @returns Should return a token to save locally for future requests
	 */
	static async authUser(creds) {
		console.log("OTD_TIL_Api.authUser() ");
		console.log("creds:", creds);
		// POST /auth/token:  { username, password } => { token }
		let res = await this.request(`auth/token`, creds, "post");
		console.log("RES:", res);

		// Set class token to the one received from the backend response
		if (res.token) {
			// this means that api recieved an approved request and we recieved a token as a response
			OTD_TIL_Api.token = res.token;
			// this also means that the username we sent was correct,
			// we can use the username in a route for users to get the rest of the information about that user
		}
		return res;
	}

	/** post Create a user thats trying to signup
	 *
	 * TODO: GET CURRENT DATE and send it ! YYYY/MM/DD
	 */
	static async registerUser(creds) {
		console.log("OTD_TIL_Api.registerUser() ");
		const user = { ...creds };
		// POST /auth/register:   { user:{ username, password, date_reg, email } } => { token }

		// Format the current date as YYYY/MM/DD
		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		});

		// Assign the formatted date to the user object
		user.date_reg = formattedDate;
		console.log("USER BEING REGISTERED:", user);
		// SEND IT!
		let res = await this.request(`auth/register`, user, "post");
		console.log("RES:", res);

		// Set class token to the one received from the backend response
		if (res.token) {
			//
			OTD_TIL_Api.token = res.token;
		}
		return res;
	}

	/**
	 * get logged in user info to display on webpage
	 * @returns { username,  isAdmin, facts } where facts is [ {fact_id, title, fact_date, page_id} , ... ]
	 */
	static async getUser(username) {
		console.log("OTD_TIL_Api.getUser() ", "sent username:", username);
		// GET /users/[username] => { user }
		let res = await this.request(`users/${username}`);
		console.log("getUser RES:", res);
		return res;
	}

	/**
	 * patch-Update a user thats trying to edit their profile
	 *
	 * PATCH users/[username] { user } => { user }
	 * Data can include:
	 * { password, email } Returns { username, email, isAdmin }
	 */
	static async patchUser(username, data) {
		console.log("OTD_TIL_Api.patchUser() ", "sent username:", username);

		let res = await this.request(`users/${username}`, data, "patch");
		console.log("RES:", res);
		return res;
	}

	/**
	 * post make user apply to a fact add fact to their application list
	 * POST users/[username]/facts/[id]  { state } => {"applied": factId}
	 * 	Returns objtc to notify of application suceess
	 */
	static async applyToFact(username, factID) {
		console.log(
			"OTD_TIL_Api.applyToFact() ",
			"sent username:",
			username,
			"Send FactID:",
			factID
		);

		try {
			let res = await this.request(
				`users/${username}/facts/${factID}`,
				{},
				"post"
			);
			console.log("RES:", res);
			return res;
		} catch (e) {
			console.error("ERROR attempting to apply to fact:", e);
			return e;
		}
	}
}

// for now, put token ("testuser" / "password" on class)
// OTD_TIL_Api.token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
// 	"eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcwNTMzMDA2NH0." +
// 	"faOxkHCRp4AB5BHuoGVhXDzMjlnEqZS6NMeG8TRXwgU";

export default OTD_TIL_Api;
