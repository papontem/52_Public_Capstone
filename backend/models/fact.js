// TODO related functions for facts

"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Fact {
	/** Create a fact (from data), update db, return new fact data.
	 *
	 * data should be { text_title, fact_date, page_id }
	 *
	 * Returns { fact_id, text_title, fact_date, page_id }
	 **/

	static async create(data) {
		const result = await db.query(
			`INSERT INTO facts (text_title,
                              fact_date,
                              page_id )
           VALUES ($1, $2, $3)
           RETURNING fact_id, text_title, fact_date,
           page_id`,
			[data.text_title, data.fact_date, data.page_id]
		);
		let fact = result.rows[0];

		return fact;
	}

	/** Find all facts (optional filter on searchFilters).
	 *
	 * searchFilters (all optional):
	 * - minSalary
	 * - hasEquity (true returns only facts with equity > 0, other values ignored)
	 * - text_title (will find case-insensitive, partial matches)
	 *
	 * Returns [{ id, text_title, salary, equity, page_id, pageName }, ...]
	 * */

	static async findAll({ minSalary, hasEquity, text_title } = {}) {
		let query = `SELECT f.id,
                        f.text_title,
                        f.salary,
                        f.equity,
                        f.page_page_id AS "page_id",
                        c.name AS "pageName"
                 FROM facts f
                   LEFT JOIN pages AS c ON c.page_id = f.page_page_id`;
    // variables needed for querying the db for matching records
		let whereExpressions = [];
		let queryValues = [];

		// For each possible search term, add to whereExpressions and
		// queryValues so we can generate the right SQL

		// if (minSalary !== undefined) {
		//   queryValues.push(minSalary);
		//   whereExpressions.push(`salary >= $${queryValues.length}`);
		// }

		// if (hasEquity === true) {
		//   whereExpressions.push(`equity > 0`);
		// }

		if (text_title !== undefined) {
			queryValues.push(`%${text_title}%`);
			whereExpressions.push(`text_title ILIKE $${queryValues.length}`);
		}

		if (whereExpressions.length > 0) {
			query += " WHERE " + whereExpressions.join(" AND ");
		}

		// Finalize query and return results
    // could try to organize by fact_date
		query += " ORDER BY text_title";
		const factsRes = await db.query(query, queryValues);
		return factsRes.rows;
	}

	/** Given a fact id, return data about fact.
	 *
	 * Returns { id, text_title, salary, equity, page_id, page }
	 *   where page is { page_id, name, description, numEmployees, logoUrl }
	 *
	 * Throws NotFoundError if not found.
	 **/

	static async get(fact_id) {
		const factRes = await db.query(
			`SELECT fact_id,
              text_title,
              fact_date,
              page_id
           FROM facts
           WHERE fact_id = $1`,
			[fact_id]
		);

		const fact = factRes.rows[0];

		if (!fact) throw new NotFoundError(`No fact: ${fact_id}`);

		const pagesRes = await db.query(
			`SELECT page_id,
              page_url,
              wikibase_item
           FROM pages
           WHERE page_id = $1`,
			[fact.page_id]
		);

		delete fact.page_id;
		fact.page = pagesRes.rows[0];

		return fact;
	}

	/** Update fact data with `data`.
	 *
	 * This is a "partial update" --- it's fine if data doesn't contain
	 * all the fields; this only changes provided ones.
	 *
	 * Data can include: { text_title, fact_date, page_id}
	 *
	 * Returns { fact_id, text_title, fact_date, page_id }
	 *
	 * Throws NotFoundError if not found.
	 */

	static async update(fact_id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {});
		const idVarIdx = "$" + (values.length + 1);

		const querySql = `UPDATE facts 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                text_title, 
                                fact_date,
                                page_id`;
		const result = await db.query(querySql, [...values, fact_id]);
		const fact = result.rows[0];

		if (!fact) throw new NotFoundError(`No fact: ${fact_id}`);

		return fact;
	}

	/** Delete given fact from database; returns undefined.
	 *
	 * Throws NotFoundError if fact not found.
	 **/

	static async remove(id) {
		const result = await db.query(
			`DELETE
           FROM facts
           WHERE id = $1
           RETURNING id`,
			[id]
		);
		const fact = result.rows[0];

		if (!fact) throw new NotFoundError(`No fact: ${id}`);
	}
}

module.exports = Fact;
