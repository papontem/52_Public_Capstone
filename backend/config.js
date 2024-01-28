"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

const PORT = +process.env.PORT || 3001;

// PAM: Adding environment variables to create a manualg pg connection
const PG_USERNAME = process.env.PG_USERNAME;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PGPORT = process.env.PGPORT;
const DB_NAME = process.env.NODE_ENV === "test" ? "onthisday_til_test_db" : "onthisday_til_db";
const short_DB_URI = `postgresql:///${DB_NAME}`;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
	return process.env.NODE_ENV === "test"
		? "onthisday_til_test_db"
		: process.env.DATABASE_URL || "onthisday_til_db";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("onthisday_til Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PGPORT:".yellow, PGPORT.toString());
console.log("NODE_ENV:".yellow, process.env.NODE_ENV);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database Name:".yellow, DB_NAME);
console.log("Database:".yellow, getDatabaseUri());
console.log("Database URI:".yellow, short_DB_URI);

console.log("---");

module.exports = {
	SECRET_KEY,
	PORT,
	BCRYPT_WORK_FACTOR,
	getDatabaseUri,
	PG_USERNAME,
	PG_PASSWORD,
	PGPORT,
	DB_NAME,
	short_DB_URI,
};
