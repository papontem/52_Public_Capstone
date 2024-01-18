// TODO routes for pages

"use strict";

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureLoggedIn } = require("../middleware/auth");
const Page = require("../models/page");

const pagesNewSchema = require("../schemas/pagesNew.json");
const pagesUpdateSchema = require("../schemas/pagesUpdate.json");
const pagesSearchSchema = require("../schemas/pagesSearch.json");

const router = new express.Router();

/** POST / { page } =>  { page }
 *
 * page should be { page_id, page_url, wikibase_item }
 *
 * Returns { page_id, page_url, wikibase_item }
 *
 * Authorization required: user or admin
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, pagesNewSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const page = await Page.create(req.body);
		return res.status(201).json({ page });
	} catch (err) {
		return next(err);
	}
});


/** GET /  =>
 *   { pages: [ { page_id, page_url, wikibase_item }, ...] }
 *
 * Can filter on provided search filters:
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
	const q = req.query;
	//   // arrive as strings from querystring, but we want as ints
	//   if (q.minEmployees !== undefined) q.minEmployees = +q.minEmployees;
	//   if (q.maxEmployees !== undefined) q.maxEmployees = +q.maxEmployees;

	try {
		const validator = jsonschema.validate(q, pagesSearchSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const pages = await Page.findAll(q);
		return res.json({ pages });
	} catch (err) {
		return next(err);
	}
});

/** GET /[page_id]  =>  { page }
 *
 *  Page is { page_id, page_url, wikibase_item, facts }
 *   where facts is [{ fact_id, title, fact_date, page_id }, ...]
 *
 * Authorization required: none
 */

router.get("/:page_id", async function (req, res, next) {
	try {
		const page = await Page.get(req.params.page_id);
		return res.json({ page });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[page_id] { fld1, fld2, ... } => { page }
 *
 * Patches page data.
 *
 * fields can be: { page_url, wikibase_item }
 *
 * Returns { page_id, page_url, wikibase_item }
 *
 * Authorization required: admin
 */

router.patch("/:page_id", ensureAdmin, async function (req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, pagesUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const page = await Page.update(req.params.page_id, req.body);
		return res.json({ page });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[page_id]  =>  { deleted: page_id }
 *
 * Authorization: admin
 */

router.delete("/:page_id", ensureAdmin, async function (req, res, next) {
	try {
		await Page.remove(req.params.page_id);
		return res.json({ deleted: req.params.page_id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
