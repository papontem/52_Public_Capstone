"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, date_reg, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
	try {

		// console.log(" ----- \n POST /users : \nreq:", req.body);
		
		const validator = jsonschema.validate(req.body, userNewSchema);
		
		// console.log(" ----- \n POST /users : \nvalidator:",validator);


		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}



		const user = await User.register(req.body);
		const token = createToken(user);
		return res.status(201).json({ user, token });
	} catch (err) {
		return next(err);
	}
});

/** GET / => { users: [ {username, date_reg, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/
router.get("/", ensureAdmin, async function (req, res, next) {
	// router.get("/", async function (req, res, next) {
	try {
		const users = await User.findAll();
		return res.json({ users });
	} catch (err) {
		return next(err);
	}
});

/** GET /[username] => { user }
 *
 * Returns { username, isAdmin, favorites }
 *   where favorites is  []
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get(
	"/:username",
	ensureCorrectUserOrAdmin,
	async function (req, res, next) {
		// console.log("ROUTES USERS PARAMS:", req.params);
		try {
			const user = await User.get(req.params.username);
			return res.json({ user });
		} catch (err) {
			return next(err);
		}
	}
);

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { username, password, email }
 *
 * Returns { username, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch(
	"/:username",
	ensureCorrectUserOrAdmin,
	async function (req, res, next) {
		try {
			const validator = jsonschema.validate(req.body, userUpdateSchema);
			if (!validator.valid) {
				const errs = validator.errors.map((e) => e.stack);
				throw new BadRequestError(errs);
			}

			const user = await User.update(req.params.username, req.body);
			return res.json({ user });
		} catch (err) {
			return next(err);
		}
	}
);

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete(
	"/:username",
	ensureCorrectUserOrAdmin,
	async function (req, res, next) {
		try {
			await User.remove(req.params.username);
			return res.json({ deleted: req.params.username });
		} catch (err) {
			return next(err);
		}
	}
);

/** POST /[username]/favorites/[id]  { state } => { application }
 *
 * Returns {"favorited": fact_Id}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post(
	"/:username/favorites/:fact_id",
	ensureCorrectUserOrAdmin,
	async function (req, res, next) {
		// console.log("Routes USER FAVORITE A FACT");
		try {
			const { username, fact_id } = req.params;
			await User.favoriteAFact(username, fact_id);
			return res.json({ favorited: fact_id });
		} catch (err) {
			return next(err);
		}
	}
);

module.exports = router;
