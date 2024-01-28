const bcrypt = require("bcrypt");
process.env.NODE_ENV = "test";
const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testFactIds = [];

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM favorites");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM facts");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM pages");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");

	await db.query(`INSERT INTO pages (page_id, page_url, wikibase_item)
    VALUES (1, 'http://www.example.com', 'Q1'),
           (2, 'http://www.example.com', 'Q2'),
           (3, 'http://www.example.com', 'Q3'),
           (4, 'http://www.example.com', 'Q4')`);

	const resultsFacts =
		await db.query(`INSERT INTO facts (text_title , fact_date , page_id)
    VALUES ('F1', '2024/01/28', 1),
           ('F2', '2024/01/28', 2),
           ('F3', '2024/01/28', 3),
           ('F4', '2024/01/28', 4)
    RETURNING fact_id`);

	// console.log("resultsFacts.rows:", resultsFacts.rows);

	testFactIds.splice(0, 0, ...resultsFacts.rows.map((r) => r.fact_id));

	// console.log("testFactIds:", testFactIds);

	await db.query(
		`
        INSERT INTO users(username, password, date_reg, email)
        VALUES ('u1', $1, '2024/01/28', 'u1@email.com'),
               ('u2', $2, '2024/01/28', 'u2@email.com')
        RETURNING username`,
		[
			await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
			await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
		]
	);

	await db.query(
		`
        INSERT INTO favorites(username, fact_id)
        VALUES ('u1', $1)`,
		[testFactIds[0]]
	);
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testFactIds,
};
