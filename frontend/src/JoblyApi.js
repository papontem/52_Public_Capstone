// Api.js

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
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
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

	/** Get all data from companies table */
	static async getCompanies() {
		let res = await this.request(`companies`);
		// console.log("RES:", res);
		return res.companies;
	}

	/** Get all data from jobs table */
	static async getJobs() {
		let res = await this.request(`jobs`);
		// console.log("RES:", res);
		return res.jobs;
	}

	/** Get data from companies table that have a name similar to search term */
	static async getCompaniesBy(searchTerm) {
		let res = await this.request(`companies?name=${searchTerm}`);
		// console.log("RES:", res);
		return res.companies;
	}

	/** Get data from jobs table that have a title similar to search term */
	static async getJobsBy(searchTerm) {
		let res = await this.request(`jobs?title=${searchTerm}`);
		// console.log("RES:", res);

		return res.jobs;
	}

	// Individual API routes --------+-+-+-+-+-+-+-+->

	/** Get details on a company by handle. */
	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		// console.log("RES:", res);
		return res.company;
	}

	/** Get details on a job by id. */
	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		// console.log("RES:", res);
		return res.job;
	}

	/** Post a user thats trying to login
	 *
	 * @returns Should return a token to save locally for future requests
	 */
	static async authUser(creds) {
		console.log("JoblyApi.authUser() ");

		// POST /auth/token:  { username, password } => { token }
		let res = await this.request(`auth/token`, creds, "post");
		console.log("RES:", res);

		// Set class token to the one received from the backend response
		if (res.token) {
			// this means that api recieved an approved request and we recieved a token as a response
			JoblyApi.token = res.token;
			// this also means that the username we sent was correct,
			// we can use the username in a route for users to get the rest of the information about that user
		}
		return res;
	}
	/** post Create a user thats trying to signup */
	static async registerUser(creds) {
		console.log("JoblyApi.registerUser() ");
		const user = { ...creds };
		// POST /auth/register:   { user:{ username, password, firstName, lastName, email } } => { token }

		let res = await this.request(`auth/register`, user, "post");
		console.log("RES:", res);

		// Set class token to the one received from the backend response
		if (res.token) {
			//
			JoblyApi.token = res.token;
		}
		return res;
	}

	/**
	 * get logged in user info to display on webpage
	 * @returns { username, firstName, lastName, isAdmin, jobs } where jobs is { id, title, companyHandle, companyName, state }
	 */
	static async getUser(username) {
		console.log("JoblyApi.getUser() ", "sent username:", username);
		// GET /users/[username] => { user }
		let res = await this.request(`users/${username}`);
		console.log("RES:", res);
		return res;
	}

	/**
	 * patch-Update a user thats trying to edit their profile
	 *
	 * PATCH users/[username] { user } => { user }
	 * Data can include:
	 * { firstName, lastName, password, email } Returns { username, firstName, lastName, email, isAdmin }
	 */
	static async patchUser(username, data) {
		console.log("JoblyApi.patchUser() ", "sent username:", username);

		let res = await this.request(`users/${username}`, data, "patch");
		console.log("RES:", res);
		return res;
	}

	/**
	 * post make user apply to a job add job to their application list
	 * POST users/[username]/jobs/[id]  { state } => {"applied": jobId}
	 * 	Returns objtc to notify of application suceess
	 */
	static async applyToJob(username, jobID) {
		console.log(
			"JoblyApi.applyToJob() ",
			"sent username:",
			username,
			"Send JobID:",
			jobID
		);

		try {
			let res = await this.request(
				`users/${username}/jobs/${jobID}`,
				{},
				"post"
			);
			console.log("RES:", res);
			return res;
		} catch (e) {
			console.error("ERROR attempting to apply to job:", e);
			return e
		}
	}
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
// 	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
// 	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

// PAM: ya forgot to add this
export default JoblyApi;
