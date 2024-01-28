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
	).id;
	testFactIds[1] = (
		await Fact.create({
			text_title: "F2",
			fact_date: "2024/01/28",
			page_id: 2,
		})
	).id;
	testFactIds[2] = (
		await Fact.create({
			text_title: "F3",
			fact_date: "2024/01/28",
			page_id: 3,
		})
	).id;

	await User.register({
		username: "u1",
		email: "user1@user.com",
		password: "password1",
		isAdmin: false,
	});
	await User.register({
		username: "u2",
		email: "user2@user.com",
		password: "password2",
		isAdmin: false,
	});
	await User.register({
		username: "u3",
		email: "user3@user.com",
		password: "password3",
		isAdmin: false,
	});

	await User.favoriteAFact("u1", testFactIds[0]);
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

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testFactIds,
	u1Token,
	u2Token,
	adminToken,
};
