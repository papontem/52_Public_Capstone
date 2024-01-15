// TODO related functions for pages
"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Page {
	/** Create a page (from data), update db, return new page data.
	 *
	 * data should be { page_id, page_url, wikibase_item }
	 *
	 * Returns { page_id, page_url, wikibase_item }
	 *
	 * Throws BadRequestError if page already in database.
	 * */

	static async create({ page_id, page_url, wikibase_item }) {
		const duplicateCheck = await db.query(
			`SELECT page_id
                FROM pages
                WHERE page_id = $1`,
			[page_id]
		);

		if (duplicateCheck.rows[0])
			throw new BadRequestError(`Duplicate page: ${page_id}`);

		const result = await db.query(
			`INSERT INTO pages
                (page_id, page_url, wikibase_item)
                VALUES ($1, $2, $3)
                RETURNING page_id, page_url, wikibase_item`,
			[page_id, page_url, wikibase_item]
		);
		const page = result.rows[0];

		return page;
	}

	/** Find all pages (optional filter on searchFilters).
	 *
	 * searchFilters (all optional):
	 *
	 * Returns [{ page_id, page_url, wikibase_item }, ...]
	 * */

	static async findAll(searchFilters = {}) {
		let query = `SELECT page_id,
                        page_url,
                        wikibase_item
                        FROM pages`;
		// variables needed for querying the db for matching records

		let whereExpressions = [];
		let queryValues = [];

		// const { minEmployees, maxEmployees, name } = searchFilters;

		// if (minEmployees > maxEmployees) {
		//   throw new BadRequestError("Min employees cannot be greater than max");
		// }

		// For each possible search term, add to whereExpressions and queryValues so
		// we can generate the right SQL

		// if (minEmployees !== undefined) {
		//   queryValues.push(minEmployees);
		//   whereExpressions.push(`num_employees >= $${queryValues.length}`);
		// }

		// if (maxEmployees !== undefined) {
		//   queryValues.push(maxEmployees);
		//   whereExpressions.push(`num_employees <= $${queryValues.length}`);
		// }

		// if (name) {
		//   queryValues.push(`%${name}%`);
		//   whereExpressions.push(`name ILIKE $${queryValues.length}`);
		// }

		if (whereExpressions.length > 0) {
			query += " WHERE " + whereExpressions.join(" AND ");
		}

		// Finalize query and return results

		query += " ORDER BY page_id";
		const pagesRes = await db.query(query, queryValues);
		return pagesRes.rows;
	}

	/** Given a page page_id, return data about page.
	 *
	 * Returns { page_id, page_url, wikibase_item, facts }
	 *   where facts is [{ fact_id, title, fact_date, page_id }, ...]
	 *
	 * Throws NotFoundError if not found.
	 **/

	static async get(page_id) {
		const pageRes = await db.query(
			`SELECT page_id,
                    page_url,
                    wikibase_item
                FROM pages
                WHERE page_id = $1`,
			[page_id]
		);

		const page = pageRes.rows[0];

		if (!page) throw new NotFoundError(`No page: ${page_id}`);

		const factsRes = await db.query(
			`SELECT fact_id,
                    title,
                    fact_date,
                    page_id
                FROM facts
                WHERE page_id = $1
                ORDER BY fact_id`,
			[page_id]
		);

		page.facts = factsRes.rows;

		return page;
	}

	/** Update page data with `data`.
	 *
	 * This is a "partial update" --- it's fine if data doesn't contain all the
	 * fields; this only changes provided ones.
	 *
	 * Data can include: { page_url, wikibase_item}
	 *
	 * Returns {page_id, page_url, wikibase_item}
	 *
	 * Throws NotFoundError if not found.
	 */

	static async update(page_id, data) {
		// const { setCols, values } = sqlForPartialUpdate(data, {
		// 	numEmployees: "num_employees",
		// 	logoUrl: "logo_url",
		// });

		const { setCols, values } = sqlForPartialUpdate(data, {});
		const page_idVarIdx = "$" + (values.length + 1);

		const querySql = `UPDATE pages 
                            SET ${setCols} 
                            WHERE page_id = ${page_idVarIdx} 
                            RETURNING page_id, 
                                      page_url,
                                      wikibase_item`;
		const result = await db.query(querySql, [...values, page_id]);
		const page = result.rows[0];

		if (!page) throw new NotFoundError(`No page: ${page_id}`);

		return page;
	}

	/** Delete given page from database; returns undefined.
	 *
	 * Throws NotFoundError if page not found.
	 **/

	static async remove(page_id) {
		const result = await db.query(
			`DELETE
                FROM pages
                WHERE page_id = $1
                RETURNING page_id`,
			[page_id]
		);
		const page = result.rows[0];

		if (!page) throw new NotFoundError(`No page: ${page_id}`);
	}
}

module.exports = Page;
