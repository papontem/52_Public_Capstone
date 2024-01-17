// TODO routes for facts
"use strict";

/** Routes for facts. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const Fact = require("../models/fact");
const factNewSchema = require("../schemas/factNew.json");
const factUpdateSchema = require("../schemas/factUpdate.json");
const factSearchSchema = require("../schemas/factSearch.json");

const router = express.Router({ mergeParams: true });

/** POST / { fact } => { fact }
 *
 * fact should be { title, fact_date, page_id }
 *
 * Returns { fact_id, title, fact_date, page_id }
 *
 * Authorization required: user or admin 
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, factNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const fact = await Fact.create(req.body);
		return res.status(201).json({ fact });
	} catch (err) {
		return next(err);
	}
});

/** GET / =>
 *   { facts: [ { fact_id, title, fact_date, page_id }, ...] }
 *
 * Can provide search filter in query:
 * - minSalary
 * - hasEquity (true returns only facts with equity > 0, other values ignored)
 * - title (will find case-insensitive, partial matches)

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
	//   const q = req.query;
	//   // arrive as strings from querystring, but we want as int/bool
	//   if (q.minSalary !== undefined) q.minSalary = +q.minSalary;
	//   q.hasEquity = q.hasEquity === "true";

	try {
		const validator = jsonschema.validate(q, factSearchSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const facts = await Fact.findAll(q);
		return res.json({ facts });
	} catch (err) {
		return next(err);
	}
});

/** GET /[fact_Id] => { fact }
 *
 * Returns { fact_id, title, fact_date, page  }
 *   where page  is { page_id, page_url, wikibase_item }
 *
 * Authorization required: none
 */

router.get("/:fact_id", async function (req, res, next) {
	try {
		const fact = await Fact.get(req.params.fact_id);
		return res.json({ fact });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[factId]  { fld1, fld2, ... } => { fact }
 *
 * Data can include: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, page Handle }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, factUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const fact = await Fact.update(req.params.id, req.body);
		return res.json({ fact });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
	try {
		await Fact.remove(req.params.id);
		return res.json({ deleted: +req.params.id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
