"use strict";

const {
	NotFoundError,
	BadRequestError,
	UnauthorizedError,
} = require("../expressError");
process.env.NODE_ENV = "test";
const db = require("../db.js");
const User = require("./user.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testFactIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("authenticate", function () {
	test("works", async function () {
		const user = await User.authenticate("u1", "password1");
		expect(user).toEqual({
			username: "u1",
			email: "u1@email.com",
			isAdmin: false,
		});
	});

	test("unauth if no such user", async function () {
		try {
			await User.authenticate("nope", "password");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});

	test("unauth if wrong password", async function () {
		try {
			await User.authenticate("c1", "wrong");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

/************************************** register */

describe("register", function () {
	const newUser = {
		username: "new",
		date_reg: new Date("2023-12-28T05:00:00.000Z"),
		email: "test@test.com",
		isAdmin: false,
	};

	test("works: adds a user", async function () {
		let user = await User.register({
			...newUser,
			password: "password",
		});
		expect(user).toEqual(newUser);
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(false);
		// check if stored password was hashed
		expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
	});

	test("works: adds admin", async function () {
		let user = await User.register({
			...newUser,
			password: "password",
			isAdmin: true,
		});
		expect(user).toEqual({ ...newUser, isAdmin: true });
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].is_admin).toEqual(true);
		// check if stored password was hashed
		expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
	});

	test("bad request with dup data", async function () {
		try {
			await User.register({
				...newUser,
				password: "password",
			});
			await User.register({
				...newUser,
				password: "password",
			});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** findAll */

describe("findAll", function () {
	test("works", async function () {
		const users = await User.findAll();
		expect(users).toEqual([
			{
				username: "u1",
				email: "u1@email.com",
				date_reg: new Date("2024-01-28T05:00:00.000Z"),
				isAdmin: false,
			},
			{
				username: "u2",
				email: "u2@email.com",
				date_reg: new Date("2024-01-28T05:00:00.000Z"),
				isAdmin: false,
			},
		]);
	});
});

/************************************** get */

describe("get", function () {
	test("works 1, user with favorites", async function () {
		let user = await User.get("u1");
		expect(user).toEqual({
			username: "u1",
			email: "u1@email.com",
			date_reg: new Date("2024-01-28T05:00:00.000Z"),
			isAdmin: false,
			favorites: [
				{
					fact_date: new Date("2024-01-28T05:00:00.000Z"),
					fact_id: testFactIds[0],
					page_id: 1,
					text_title: "F1",
				},
			],
		});
	});
	test("works 2, user with no favorites", async function () {
		let user = await User.get("u2");
		expect(user).toEqual({
			username: "u2",
			email: "u2@email.com",
			date_reg: new Date("2024-01-28T05:00:00.000Z"),
			isAdmin: false,
			favorites: [],
		});
	});

	test("not found if no such user", async function () {
		try {
			await User.get("nope");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** update */

describe("update", function () {
	const updateData = {
		email: "new@email.com",
		date_reg: new Date("2024-01-28T05:00:00.000Z"),
		isAdmin: true,
	};

	test("works", async function () {
		let user = await User.update("u1", updateData);
		expect(user).toEqual({
			username: "u1",
			...updateData,
		});
	});

	test("works: set password", async function () {
		let user = await User.update("u1", {
			password: "new",
		});
		expect(user).toEqual({
			username: "u1",
			email: "u1@email.com",
			date_reg: new Date("2024-01-28T05:00:00.000Z"),
			isAdmin: false,
			// favorites: [
			// 	{
			// 		fact_date: new Date("2024-01-28T05:00:00.000Z"),
			// 		fact_id: 1,
			// 		page_id: 1,
			// 		text_title: "F1",
			// 	},
			// ],
		});
		const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
	});

	test("not found if no such user", async function () {
		try {
			await User.update("nope", {
				email: "test_nope@email.com",
			});
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test("bad request if no data", async function () {
		expect.assertions(1);
		try {
			await User.update("u1", {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function () {
	test("works", async function () {
		await User.remove("u1");
		const res = await db.query("SELECT * FROM users WHERE username='u1'");
		expect(res.rows.length).toEqual(0);
	});

	test("not found if no such user", async function () {
		try {
			await User.remove("nope");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** favoriteAFact */

describe("favoriteAFact", function () {
	test("works", async function () {
		await User.favoriteAFact("u1", testFactIds[1]);

		const res = await db.query("SELECT * FROM favorites WHERE fact_id=$1", [
			testFactIds[1],
		]);
		expect(res.rows).toEqual([
			{
				fact_id: testFactIds[1],
				username: "u1",
			},
		]);
	});

	test("not found if no such fact", async function () {
		try {
			await User.favoriteAFact("u1", 0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test("not found if no such user", async function () {
		try {
			await User.favoriteAFact("nope", testFactIds[0]);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
