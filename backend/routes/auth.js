"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
	// console.log(" ------------------- \n REQ body:", req.body);
	try {
		const validator = jsonschema.validate(req.body, userAuthSchema);
		if (!validator.valid) {
			// console.log("---- \n VALIDATION FAILURE");
			console.log("ERROR in validating auth/token");
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		// console.log("---- \n VALIDATION SUCCESS");
		const { username, password } = req.body;
		const user = await User.authenticate(username, password);
		const token = createToken(user);
		return res.json({ token });
	} catch (err) {
		return next(err);
	}
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, date_reg, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
	try {

		// console.log("----------- Routes \n AUTH/register \n ----------- user req :",req.body);

		const validator = jsonschema.validate(req.body, userRegisterSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newUser = await User.register({ ...req.body, isAdmin: false });
		const token = createToken(newUser);
		return res.status(201).json({ token });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
