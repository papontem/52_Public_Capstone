"use strict";
process.env.NODE_ENV = "test";
const db = require("../db.js");
const User = require("../models/user");
const Page = require("../models/page");
const Fact = require("../models/fact");
const { createToken } = require("../helpers/tokens");

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

	await Page.create({
		page_id: 1,
		page_url: "http://www.example.com",
		wikibase_item: "Q1",
	});
	await Page.create({
		page_id: 2,
		page_url: "http://www.example.com",
		wikibase_item: "Q2",
	});
	await Page.create({
		page_id: 3,
		page_url: "http://www.example.com",
		wikibase_item: "Q3",
	});

	testFactIds[0] = (
		await Fact.create({
			text_title: "F1",
			fact_date: "2024/01/28",
			page_id: 1,
		})
	).fact_id;
	testFactIds[1] = (
		await Fact.create({
			text_title: "F2",
			fact_date: "2024/01/28",
			page_id: 2,
		})
	).fact_id;
	testFactIds[2] = (
		await Fact.create({
			text_title: "F3",
			fact_date: "2024/01/28",
			page_id: 3,
		})
	).fact_id;

	await User.register({
		username: "a1",
		email: "admin1@user.com",
		date_reg: new Date("2024-01-28T05:00:00.000Z"),
		password: "password1",
		isAdmin: true,
	});
	await User.register({
		username: "u2",
		email: "user2@user.com",
		date_reg: new Date("2024-01-28T05:00:00.000Z"),
		password: "password2",
		isAdmin: false,
	});
	await User.register({
		username: "u3",
		email: "user3@user.com",
		date_reg: new Date("2024-01-28T05:00:00.000Z"),
		password: "password3",
		isAdmin: false,
	});

	await User.favoriteAFact("a1", testFactIds[0]);
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

const a1Token = createToken({ username: "a1", isAdmin: true });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testFactIds,
	a1Token,
	u2Token,
	adminToken,
};
