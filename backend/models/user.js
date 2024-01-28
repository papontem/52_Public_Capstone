"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
	/** authenticate user with username, password.
	 *
	 * Returns { username, first_name, last_name, email, is_admin }
	 *
	 * Throws UnauthorizedError is user not found or wrong password.
	 **/

	static async authenticate(username, password) {
		// try to find the user first
		const result = await db.query(
			`SELECT username,
                  password,
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
			[username]
		);

		const user = result.rows[0];

		if (user) {
			// compare hashed password to a new hash from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid === true) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError("Invalid username/password");
	}

	/** Register user with data.
	 *
	 * Returns { username, date_reg, email, isAdmin }
	 *
	 * Throws BadRequestError on duplicates.
	 **/

	static async register({ username, password, date_reg, email, isAdmin }) {

		// console.log("-----------\nModels\nUSER.register user data :",{username, password, date_reg, email, isAdmin}, "\n-----------");

		const duplicateCheck = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[username]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate username: ${username}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
           (username,
            password,
            date_reg,
            email,
            is_admin)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, date_reg, email, is_admin AS "isAdmin"`,
			[username, hashedPassword, date_reg, email, isAdmin]
		);

		const user = result.rows[0];

		return user;
	}

	/** Find all users.
	 *
	 * Returns [{ username, date_reg, email, is_admin }, ...]
	 **/

	static async findAll() {
		const result = await db.query(
			`SELECT username,
                  date_reg,
                  email,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`
		);

		return result.rows;
	}

	// TODO
	/** Given a username, return data about user.
	 *
	 * Returns { username, date_reg, email, is_admin, favorites}
	 *   where favorites is [ { fact_id, title, fact_date, page_id, }, ... ]
	 *
	 * Throws NotFoundError if user not found.
	 **/

	static async get(username) {
		// console.log("MODELS USER GET:", username);
		const userRes = await db.query(
			`SELECT username,
                  date_reg,
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
			[username]
		);

		const user = userRes.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		// TODO FAVORITE FACT LIST -----------------------------------
		const userFavoritesRes = await db.query(
			`SELECT 
				f.fact_id,
				fs.text_title,
				fs.fact_date,
				fs.page_id
			FROM favorites AS f
			JOIN facts AS fs ON f.fact_id = fs.fact_id
			WHERE f.username = $1`,
			[username]
		);

		user.favorites = userFavoritesRes.rows.map((f) => {
			let fact = {
				fact_id: f.fact_id,
				text_title: f.text_title,
				fact_date: f.fact_date,
				page_id: f.page_id,
			};
			return fact;
		});
		// user.favorites = []
		return user;
	}

	/** Update user data with `data`.
	 *
	 * This is a "partial update" --- it's fine if data doesn't contain
	 * all the fields; this only changes provided ones.
	 *
	 * Data can include:
	 *   { password, email, isAdmin }
	 *
	 * Returns { username, email, isAdmin }
	 *
	 * Throws NotFoundError if not found.
	 *
	 * WARNING: this function can set a new password or make a user an admin.
	 * Callers of this function must be certain they have validated inputs to this
	 * or a serious security risks are opened.
	 */

	static async update(username, data) {
		if (data.password) {
			data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
		}

		const { setCols, values } = sqlForPartialUpdate(data, {
			isAdmin: "is_admin",
		});
		const usernameVarIdx = "$" + (values.length + 1);

		const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                date_reg,
                                email,
                                is_admin AS "isAdmin"`;
		const result = await db.query(querySql, [...values, username]);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		delete user.password;
		return user;
	}

	/** Delete given user from database; returns undefined. */

	static async remove(username) {
		let result = await db.query(
			`DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
			[username]
		);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);
	}

	/** favorite a fact: update db, returns undefined.
	 * - username: username trying to favorite a fact
	 * - fact_Id: fact id
	 **/

	static async favoriteAFact(username, fact_Id) {
		console.log("Models USER FAVORITE A FACT");

		const preCheck = await db.query(
			`SELECT fact_id
           FROM facts
           WHERE fact_id = $1`,
			[fact_Id]
		);
		const fact = preCheck.rows[0];

		if (!fact) throw new NotFoundError(`No fact: ${fact_Id}`);

		const preCheck2 = await db.query(
			`SELECT username
           FROM users
           WHERE username = $1`,
			[username]
		);
		const user = preCheck2.rows[0];

		if (!user) throw new NotFoundError(`No username: ${username}`);

		await db.query(
			`INSERT INTO favorites (fact_id, username)
           VALUES ($1, $2)`,
			[fact_Id, username]
		);
	}
}

module.exports = User;

/**
 * Error: Not Found
    at /home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/app.js:44:14
    at Layer.handle [as handle_request] (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:328:13)
    at /home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:286:9
    at Function.process_params (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:346:12)
    at next (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:280:10)
    at /home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:646:15
    at next (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:265:14)
    at Function.handle (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:175:3)
    at router (/home/papontemjetix/linux_Documents/linux_CODING/USF_Bootcamp/Units/github/public/52_Public_Capstone/backend/node_modules/express/lib/router/index.js:47:12)
POST /users/testuser/facts/55 404 1.079 ms - 46
 */
